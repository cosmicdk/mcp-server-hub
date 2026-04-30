#!/usr/bin/env node
/**
 * 🎯 MCP Server Hub CLI v2.0
 * One command to discover, install, and manage MCP servers.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

interface ServerInfo {
  name: string; package: string; emoji: string;
  description: string; tools: string[];
  env?: Record<string, string>; requiresApiKey: boolean;
}

const REGISTRY: ServerInfo[] = [
  { name: "weather", package: "@mcp-hub/server-weather", emoji: "🌤️",
    description: "7-day weather forecast, current conditions, air quality",
    tools: ["get_forecast", "get_current", "get_air_quality"], requiresApiKey: false },
  { name: "translator", package: "@mcp-hub/server-translator", emoji: "🌍",
    description: "Multi-language translation, language detection",
    tools: ["translate", "list_languages", "detect_language"], requiresApiKey: false },
  { name: "filesystem", package: "@mcp-hub/server-filesystem", emoji: "📁",
    description: "Safe file read/write/list/search within allowed dirs",
    tools: ["read_file", "write_file", "list_directory", "file_info", "search_files"],
    env: { MCP_ALLOWED_DIRS: "$HOME:/tmp" }, requiresApiKey: false },
  { name: "database", package: "@mcp-hub/server-database", emoji: "🗄️",
    description: "SQL query interface for SQLite (read-only by default)",
    tools: ["db_query", "db_tables", "db_schema", "db_stats", "db_execute"],
    env: { MCP_DB_PATH: ":memory:", MCP_DB_READONLY: "true" }, requiresApiKey: false },
  { name: "web-search", package: "@mcp-hub/server-web-search", emoji: "🔍",
    description: "Web search via DuckDuckGo, webpage content extraction",
    tools: ["web_search", "fetch_page"], requiresApiKey: false },
  { name: "datetime", package: "@mcp-hub/server-datetime", emoji: "📅",
    description: "Timezone conversion, date arithmetic, countdown",
    tools: ["get_current_time", "convert_timezone", "calculate_date", "day_of_week", "countdown"], requiresApiKey: false },
  { name: "calculator", package: "@mcp-hub/server-calculator", emoji: "🔢",
    description: "Math expression evaluation, unit conversion, hex/dec",
    tools: ["calculate", "convert_unit", "hex_dec"], requiresApiKey: false },
  { name: "qrcode", package: "@mcp-hub/server-qrcode", emoji: "📱",
    description: "Generate QR codes, WiFi codes, vCard contact codes",
    tools: ["generate_qrcode", "generate_wifi_qr", "generate_vcard"], requiresApiKey: false },
  { name: "rss", package: "@mcp-hub/server-rss", emoji: "📡",
    description: "Fetch and parse RSS/Atom feeds, discover feeds from websites",
    tools: ["fetch_feed", "discover_feed"], requiresApiKey: false },
];

const G="\x1b[32m", B="\x1b[34m", Y="\x1b[33m", R="\x1b[31m", BD="\x1b[1m", RS="\x1b[0m";
function banner(){console.log(`\n${B}${BD}  🎯 MCP Server Hub v2.0${RS}\n${B}  ${'─'.repeat(40)}${RS}\n  ${G}开箱即用的 MCP 服务器全家桶 - ${REGISTRY.length} servers${RS}\n`)}
function getClaudeConfigPath(){const p=os.platform();if(p==="darwin")return path.join(os.homedir(),"Library/Application Support/Claude/claude_desktop_config.json");if(p==="win32")return path.join(process.env.APPDATA||"","Claude/claude_desktop_config.json");return path.join(os.homedir(),".config/Claude/claude_desktop_config.json")}
function genCfg(s:ServerInfo):Record<string,unknown>{const c:Record<string,unknown>={command:"npx",args:["-y",s.package]};if(s.env)c.env=s.env;return c}

function cmdList(){banner();console.log(`${BD}Available Servers:${RS}\n`);REGISTRY.forEach(s=>{const k=s.requiresApiKey?` ${Y}[API KEY]${RS}`:"";console.log(`  ${s.emoji} ${BD}${s.name.padEnd(14)}${RS} ${s.description}${k}`);console.log(`     ${B}npx ${s.package}${RS}\n`)});console.log(`${'─'.repeat(50)}`);console.log(`${BD}Total: ${REGISTRY.length} servers${RS}`);console.log(`\nRun ${G}npx mcp-server-hub config${RS} to generate Claude Desktop config.\n`)}
function cmdInfo(name:string){const s=REGISTRY.find(x=>x.name===name);if(!s){console.error(`${R}Unknown server: ${name}${RS}`);console.error(`Run ${G}mcp-server-hub list${RS}`);process.exit(1)}console.log(`\n${BD}${s.emoji} ${s.name}${RS}\n${B}${'─'.repeat(40)}${RS}\n📦 ${G}${s.package}${RS}\n📝 ${s.description}\n\n${BD}Tools:${RS}\n${s.tools.map(t=>`  🔧 ${t}`).join("\n")}\n\n${BD}Config:${RS}`);const c=genCfg(s);console.log(`  "${s.name}": ${JSON.stringify(c,null,2).replace(/\n/g,"\n  ")}`);if(s.env){console.log(`\n${Y}Env:${RS}`);Object.entries(s.env).forEach(([k,v])=>console.log(`  ${k}=${v}`))}console.log()}
function cmdInstall(name:string){const s=REGISTRY.find(x=>x.name===name);if(!s){console.error(`${R}Unknown: ${name}${RS}`);process.exit(1)}console.log(`\n📦 ${s.emoji} ${s.name}\n   ${G}${s.package}${RS}\n\n${BD}Claude Desktop Config:${RS}\n`);const c=genCfg(s);console.log(`  "${s.name}": ${JSON.stringify(c,null,2).replace(/\n/g,"\n  ")}`);if(s.env){console.log(`\n${Y}Env:${RS}`);Object.entries(s.env).forEach(([k,v])=>console.log(`  export ${k}=${v}`))}console.log(`\n${G}✅ Done!${RS}\n`)}
function cmdConfig(){const config:Record<string,unknown>={mcpServers:{}};const m=config.mcpServers as Record<string,unknown>;REGISTRY.filter(s=>!s.requiresApiKey).forEach(s=>{m[s.name]=genCfg(s)});console.log(`\n${BD}Claude Desktop Config${RS}\n${B}${'─'.repeat(50)}${RS}\n\n${Y}${getClaudeConfigPath()}${RS}:\n`);console.log(JSON.stringify(config,null,2));console.log(`\n${G}✅ ${Object.keys(m).length} servers configured.${RS}\n`)}
function cmdHelp(){banner();console.log(`${BD}Usage:${RS} npx mcp-server-hub <command>\n`);console.log(`${BD}Commands:${RS}`);console.log(`  ${G}list${RS}              List all servers`);console.log(`  ${G}info <name>${RS}        Server details`);console.log(`  ${G}install <name>${RS}     Show install config`);console.log(`  ${G}config${RS}            Generate Claude config`);console.log(`  ${G}help${RS}              Show this help\n`)}

const args=process.argv.slice(2);const cmd=args[0]||"help";const tgt=args[1];
switch(cmd){case"list":case"ls":cmdList();break;case"info":case"show":if(!tgt){console.error(`${R}Usage: mcp-server-hub info <name>${RS}`);process.exit(1)}cmdInfo(tgt);break;case"install":case"add":if(!tgt){console.error(`${R}Usage: mcp-server-hub install <name>${RS}`);process.exit(1)}cmdInstall(tgt);break;case"config":case"generate":cmdConfig();break;default:cmdHelp();}
