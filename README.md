<h1 align="center">🎯 MCP Server Hub</h1>
<p align="center">
  <b>开箱即用的 MCP 服务器全家桶</b><br>
  一键安装 · 零配置 · 覆盖 10+ 场景
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-blue" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license">
  <img src="https://img.shields.io/badge/servers-10-orange" alt="servers">
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="node">
</p>

---

## 🤔 这是什么？

**MCP Server Hub** 让 AI 助手（Claude Desktop、Cursor、Cline 等）立刻获得超能力：

| 服务器 | 功能 | 一句话 |
|--------|------|--------|
| 🌤️ **Weather** | 天气查询 | "今天需要带伞吗？" |
| 🌍 **Translator** | 多语翻译 | "把这段话翻成日文" |
| 📁 **Filesystem** | 文件管理 | "帮我把下载文件夹整理好" |
| 🗄️ **Database** | 数据库查询 | "查一下上个月的用户增长" |
| 🔍 **Web Search** | 网页搜索 | "帮我搜一下 React 19 新特性" |
| 📅 **DateTime** | 时间日期 | "下周五是几号？" |
| 🔢 **Calculator** | 科学计算 | "计算这个积分..." |
| 📱 **QR Code** | 二维码 | "生成这个链接的二维码" |
| 📡 **RSS** | 阅读器 | "今天 Hacker News 有什么热门？" |

## ⚡ 5 秒上手

```bash
# 查看所有服务器
npx mcp-server-hub list

# 一键生成 Claude Desktop 配置
npx mcp-server-hub config

# 查看服务器详情
npx mcp-server-hub info weather
```

## 🎮 Claude Desktop 配置

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@mcp-hub/server-weather"]
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@mcp-hub/server-web-search"]
    },
    "datetime": {
      "command": "npx",
      "args": ["-y", "@mcp-hub/server-datetime"]
    }
  }
}
```

## 🏗️ 项目结构

```
mcp-server-hub/
├── packages/
│ ├── cli/ # 🎯 一键管理 CLI
│ ├── shared/ # 共享工具库
│ ├── server-template/ # 🏷️ 新服务器模板
│ ├── server-weather/ # 🌤️ 天气
│ ├── server-translator/ # 🌍 翻译
│ ├── server-filesystem/ # 📁 文件
│ ├── server-database/ # 🗄️ 数据库
│ ├── server-web-search/ # 🔍 搜索
│ ├── server-datetime/ # 📅 日期
│ ├── server-calculator/ # 🔢 计算
│ ├── server-qrcode/ # 📱 二维码
│ └── server-rss/ # 📡 RSS
├── docs/ # 文档
├── scripts/ # 脚本
└── docker-compose.yml # Docker 部署
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 8

### 安装与开发

```bash
git clone https://github.com/cosmicdk/mcp-server-hub.git
cd mcp-server-hub
pnpm install
pnpm build

# 运行 CLI
node packages/cli/dist/index.js list
```

### 创建新服务器

```bash
cp -r packages/server-template packages/server-YOURNAME
# 编辑 package.json + src/index.ts
pnpm install && pnpm build
```

### Docker 部署

```bash
docker-compose up -d
```

## 🤝 贡献

欢迎贡献新服务器！详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 许可

MIT © [cosmicdk](https://github.com/cosmicdk)

---

<p align="center">⭐ 如果这个项目对你有用，请给个 Star！</p>
