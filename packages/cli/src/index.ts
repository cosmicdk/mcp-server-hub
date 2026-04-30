#!/usr/bin/env node
/**
 * 🎯 MCP Server Hub CLI
 * One command to discover, install, and manage MCP servers.
 *
 * Usage:
 *   npx mcp-server-hub list              # List all available servers
 *   npx mcp-server-hub info weather       # Show server details
 *   npx mcp-server-hub install weather    # Generate config for a server
 *   npx mcp-server-hub config             # Generate full Claude Desktop config
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

// ── Server Registry ───────────────────────────────────

interface ServerInfo {
  name: string;
  package: string;
  emoji: string;
  description: string;
  tools: string[];
  env?: Record<string, string>;
  requiresApiKey: boolean;
}

const REGISTRY: ServerInfo[] = [
  {
    name: "weather",
    package: "@mcp-hub/server-weather",
    emoji: "🌤️",
    description: "7-day weather forecast, current conditions, air quality",
    tools: ["get_forecast", "get_current", "get_air_quality"],
    requiresApiKey: false,
  },
  {
    name: "translator",
    package: "@mcp-hub/server-translator",
    emoji: "🌍",
    description: "Multi-language translation, language detection",
    tools: ["translate", "list_languages", "detect_language"],
    requiresApiKey: false,
  },
  {
    name: "filesystem",
    package: "@mcp-hub/server-filesystem",
    emoji: "📁",
    description: "Safe file read/write/list/search within allowed dirs",
    tools: ["read_file", "write_file", "list_directory", "file_info", "search_files"],
    env: { MCP_ALLOWED_DIRS: "$HOME:/tmp" },
    requiresApiKey: false,
  },
  {
    name: "database",
    package: "@mcp-hub/server-database",
    emoji: "🗄️",
    description: "SQL query interface for SQLite (read-only by default)",
    tools: ["db_query", "db_tables", "db_schema", "db_stats", "db_execute"],
    env: { MCP_DB_PATH: ":memory:", MCP_DB_READONLY: "true" },
    requiresApiKey: false,
  },
  {
    name: "web-search",
    package: "@mcp-hub/server-web-search",
    emoji: "🔍",
    description: "Web search via DuckDuckGo, webpage content extraction",
    tools: ["web_search", "fetch_page"],
    requiresApiKey: false,
  },
  {
    name: "datetime",
    package: "@mcp-hub/server-datetime",
    emoji: "📅",
    description: "Timezone conversion, date arithmetic, countdown",
    tools: ["get_current_time", "convert_timezone", "calculate_date", "day_of_week", "countdown"],
    requiresApiKey: false,
  },
  {
    name: "calculator",
    package: "@mcp-hub/server-calculator",
    emoji: "🔢",
    description: "Math expression evaluation, unit conversion, hex/dec",
    tools: ["calculate", "convert_unit", "hex_dec"],
    requiresApiKey: false,
  },
  {
    name: "qrcode",
    package: "@mcp-hub/server-qrcode",
    emoji: "📱",
    description: "Generate QR codes, WiFi codes, vCard contact codes",
    tools: ["generate_qrcode", "generate_wifi_qr", "generate_vcard"],
    requiresApiKey: false,
  },
];

// ── Helpers ───────────────────────────────────────────

const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

function banner() {
  console.log(`
${BLUE}${BOLD}  🎯 MCP Server Hub v2.0${RESET}
${BLUE}  ${'─'.repeat(40)}${RESET}
  ${GREEN}开箱即用的 MCP 服务器全家桶${RESET}
`);
}

function getClaudeConfigPath(): string {
  const platform = os.platform();
  if (platform === "darwin") {
    return path.join(
      os.homedir(),
      "Library/Application Support/Claude/claude_desktop_config.json"
    );
  }
  if (platform === "win32") {
    return path.join(
      process.env.APPDATA || "",
      "Claude/claude_desktop_config.json"
    );
  }
  // Linux
  return path.join(
    os.homedir(),
    ".config/Claude/claude_desktop_config.json"
  );
}

function generateServerConfig(server: ServerInfo): Record<string, unknown> {
  const config: Record<string, unknown> = {
    command: "npx",
    args: ["-y", server.package],
  };
  if (server.env) {
    config.env = server.env;
  }
  return config;
}

// ── Commands ──────────────────────────────────────────

function cmdList() {
  banner();
  console.log(`${BOLD}Available Servers:${RESET}\n`);

  REGISTRY.forEach((s) => {
    const keyTag = s.requiresApiKey ? ` ${YELLOW}[API KEY]${RESET}` : "";
    console.log(
      `  ${s.emoji} ${BOLD}${s.name.padEnd(14)}${RESET} ${s.description}${keyTag}`
    );
    console.log(`     ${BLUE}npx ${s.package}${RESET}`);
    console.log();
  });

  console.log(`${'─'.repeat(50)}`);
  console.log(`${BOLD}Total: ${REGISTRY.length} servers${RESET}`);
  console.log(
    `\nRun ${GREEN}npx mcp-server-hub config${RESET} to generate Claude Desktop config.`
  );
}

function cmdInfo(name: string) {
  const server = REGISTRY.find((s) => s.name === name);
  if (!server) {
    console.error(`${RED}Unknown server: ${name}${RESET}`);
    console.error(`Run ${GREEN}mcp-server-hub list${RESET} to see all servers.`);
    process.exit(1);
  }

  console.log(`
${BOLD}${server.emoji} ${server.name}${RESET}
${BLUE}${'─'.repeat(40)}${RESET}
📦 Package: ${GREEN}${server.package}${RESET}
📝 ${server.description}

${BOLD}Tools:${RESET}
${server.tools.map((t) => `  🔧 ${t}`).join("\n")}

${BOLD}Quick Start:${RESET}
  ${GREEN}npx ${server.package}${RESET}

${BOLD}Claude Desktop Config:${RESET}
  Add to claude_desktop_config.json → mcpServers:
`);

  const config = generateServerConfig(server);
  console.log(`  "${server.name}": ${JSON.stringify(config, null, 4).replace(/\n/g, "\n  ")}`);

  if (server.env) {
    console.log(`\n${YELLOW}⚙️  Environment variables:${RESET}`);
    Object.entries(server.env).forEach(([k, v]) => {
      console.log(`  ${k}=${v}`);
    });
  }
  console.log();
}

function cmdInstall(name: string) {
  const server = REGISTRY.find((s) => s.name === name);
  if (!server) {
    console.error(`${RED}Unknown server: ${name}${RESET}`);
    process.exit(1);
  }

  console.log(`\n📦 Installing ${server.emoji} ${server.name}...`);
  console.log(`   Package: ${GREEN}${server.package}${RESET}`);
  console.log(`\n${BOLD}Claude Desktop Config (add this):${RESET}\n`);

  const config = generateServerConfig(server);
  const jsonBlock = `  "${server.name}": ${JSON.stringify(config, null, 2).replace(/\n/g, "\n  ")}`;
  console.log(jsonBlock);

  if (server.env) {
    console.log(`\n${YELLOW}⚙️  Don't forget to set environment variables:${RESET}`);
    Object.entries(server.env).forEach(([k, v]) => {
      console.log(`  export ${k}=${v}`);
    });
  }

  console.log(`\n${GREEN}✅ Done! Restart Claude Desktop to activate.${RESET}\n`);
}

function cmdConfig() {
  const config: Record<string, unknown> = { mcpServers: {} };
  const mcpServers = config.mcpServers as Record<string, unknown>;

  REGISTRY.forEach((s) => {
    if (!s.requiresApiKey) {
      mcpServers[s.name] = generateServerConfig(s);
    }
  });

  console.log(`
${BOLD}🎮 Claude Desktop Configuration${RESET}
${BLUE}${'─'.repeat(50)}${RESET}

Paste this into ${YELLOW}${getClaudeConfigPath()}${RESET}:
`);

  console.log(JSON.stringify(config, null, 2));

  console.log(
    `\n${GREEN}✅ Generated config for ${Object.keys(mcpServers).length} servers.${RESET}`
  );
  console.log(
    `${YELLOW}💡 Tip: Remove servers you don't need to keep it lean.${RESET}\n`
  );
}

function cmdHelp() {
  banner();
  console.log(`${BOLD}Usage:${RESET} npx mcp-server-hub <command>\n`);
  console.log(`${BOLD}Commands:${RESET}`);
  console.log(`  ${GREEN}list${RESET}              List all available servers`);
  console.log(`  ${GREEN}info <name>${RESET}        Show server details (e.g., info weather)`);
  console.log(`  ${GREEN}install <name>${RESET}     Show install config for a server`);
  console.log(`  ${GREEN}config${RESET}            Generate full Claude Desktop config`);
  console.log(`  ${GREEN}help${RESET}              Show this help\n`);
  console.log(`${BOLD}Examples:${RESET}`);
  console.log(`  npx mcp-server-hub list`);
  console.log(`  npx mcp-server-hub info weather`);
  console.log(`  npx mcp-server-hub config\n`);
}

// ── Main ──────────────────────────────────────────────

const args = process.argv.slice(2);
const command = args[0] || "help";
const target = args[1];

switch (command) {
  case "list":
  case "ls":
    cmdList();
    break;
  case "info":
  case "show":
    if (!target) {
      console.error(`${RED}Usage: mcp-server-hub info <server-name>${RESET}`);
      process.exit(1);
    }
    cmdInfo(target);
    break;
  case "install":
  case "add":
    if (!target) {
      console.error(`${RED}Usage: mcp-server-hub install <server-name>${RESET}`);
      process.exit(1);
    }
    cmdInstall(target);
    break;
  case "config":
  case "generate":
    cmdConfig();
    break;
  case "help":
  case "--help":
  case "-h":
    cmdHelp();
    break;
  default:
    console.error(`${RED}Unknown command: ${command}${RESET}`);
    cmdHelp();
    process.exit(1);
}
