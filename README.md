<h1 align="center">🎯 MCP Server Hub</h1>
<p align="center">
  <b>AI Agent 原生工具链 — 给 AI 装上超能力</b><br>
  一键安装 · 零配置 · 12 个即用型 MCP 服务器
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0-blue" alt="v3">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT">
  <img src="https://img.shields.io/badge/servers-12-orange" alt="12">
  <img src="https://img.shields.io/badge/tools-40+-purple" alt="40+">
</p>

---

## 🧠 AI Agent 的日常困境 → 我们的解决方案

| AI 想做什么 | 困境 | 工具 |
|-----------|------|------|
| "上次你说过..." | 跨会话记忆丢失 | 🧠 **Memory** 持久 KV 存储 |
| "帮我调一下这个 API" | 没有 HTTP 客户端 | 🌐 **Fetch** 通用请求 |
| "这段代码能跑吗？" | 无法执行代码 | 🐍 **Code Runner** 沙箱 |
| "今天需要带伞吗？" | 没有天气数据 | 🌤️ **Weather** 预报 |
| "把这段翻成日文" | 需要翻译能力 | 🌍 **Translator** 多语 |
| "搜一下 React 19" | 无法联网搜索 | 🔍 **Web Search** |
| "整理我的文件" | 不能操作文件 | 📁 **Filesystem** |
| "数据库里有多少用户" | 不能查数据库 | 🗄️ **Database** SQL |
| "下周五是几号" | 需要日期计算 | 📅 **DateTime** |
| "计算复利 10 年" | 需要数学能力 | 🔢 **Calculator** |
| "生成这个链接的二维码" | 需要生成图片 | 📱 **QR Code** |
| "Hacker News 今天热榜" | 需要读 RSS | 📡 **RSS** |

## ⚡ 5 秒上手

```bash
# 查看 12 个服务器（按类别分组）
npx mcp-server-hub list

# 一键生成 Claude Desktop 配置
npx mcp-server-hub config
```

## 🎮 Claude Desktop 配置

```json
{
  "mcpServers": {
    "memory": { "command": "npx", "args": ["-y", "@mcp-hub/server-memory"] },
    "fetch": { "command": "npx", "args": ["-y", "@mcp-hub/server-fetch"] },
    "code-runner": { "command": "npx", "args": ["-y", "@mcp-hub/server-code-runner"] },
    "weather": { "command": "npx", "args": ["-y", "@mcp-hub/server-weather"] }
  }
}
```

## 🔥 AI 三件套（v3 新增）

| 服务器 | 核心能力 | 典型场景 |
|--------|---------|---------|
| 🧠 **Memory** | 持久 KV 存储、TTL 过期、标签分类 | AI: "记住用户偏好暗色主题" → 下次对话依然知道 |
| 🌐 **Fetch** | GET/POST/PUT/DELETE、自定义 Header、超时 | AI: "调 GitHub API 查最新 release" → 直接返回 JSON |
| 🐍 **Code Runner** | Python3/Node.js 沙箱执行、超时保护 | AI: "帮我写个脚本处理 CSV" → 立即执行看结果 |

## 🏗️ 项目结构

```
packages/
├── cli/               🎯 一键管理 CLI
├── server-memory/     🧠 持久记忆 (NEW)
├── server-fetch/      🌐 HTTP 客户端 (NEW)
├── server-code-runner/🐍 代码沙箱 (NEW)
├── server-weather/    🌤️ 天气
├── server-translator/ 🌍 翻译
├── server-filesystem/ 📁 文件
├── server-database/   🗄️ 数据库
├── server-web-search/ 🔍 搜索
├── server-datetime/   📅 日期
├── server-calculator/ 🔢 计算
├── server-qrcode/     📱 二维码
├── server-rss/        📡 RSS
└── server-template/   🏷️ 模板
```

## 🤝 贡献

```bash
cp -r packages/server-template packages/server-YOURNAME
# 编辑 src/index.ts → 添加工具
pnpm install && pnpm build
```

## 📄 许可

MIT © [cosmicdk](https://github.com/cosmicdk)

---

<p align="center">⭐ 如果这个项目能帮到你的 AI Agent，请给个 Star！</p>
