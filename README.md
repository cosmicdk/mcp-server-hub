<h1 align="center">🎯 MCP Server Hub</h1>
<p align="center">
  <b>开箱即用的 MCP 服务器全家桶</b><br>
  一键安装 · 零配置 · 覆盖 8+ 场景
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/mcp-server-hub?color=blue" alt="npm">
  <img src="https://img.shields.io/github/license/cosmicdk/mcp-server-hub?color=green" alt="license">
  <img src="https://img.shields.io/github/stars/cosmicdk/mcp-server-hub?style=social" alt="stars">
</p>

---

## 🤔 这是什么？

**MCP Server Hub** 是一个 Monorepo，包含 **8+ 个即用型 MCP 服务器**，让 AI 助手（Claude Desktop、Continue、Cline 等）立刻获得：

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

## ⚡ 10 秒安装

```bash
# 一键安装所有服务器
npx mcp-server-hub install

# 或单独安装某个
npx @mcp-hub/server-weather
```

## 🎮 Claude Desktop 配置

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["-y", "@mcp-hub/server-weather"]
    },
    "translator": {
      "command": "npx",
      "args": ["-y", "@mcp-hub/server-translator"]
    }
  }
}
```

## 🏗️ 项目结构

```
mcp-server-hub/
├── packages/
│ ├── shared/ # 共享工具库
│ ├── server-weather/ # 天气查询
│ ├── server-translator/ # 翻译服务
│ ├── server-filesystem/ # 文件管理
│ ├── server-database/ # 数据库查询
│ ├── server-web-search/ # 网页搜索
│ ├── server-datetime/ # 时间日期
│ ├── server-calculator/ # 科学计算
│ └── server-qrcode/ # 二维码
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
# 克隆
git clone https://github.com/cosmicdk/mcp-server-hub.git
cd mcp-server-hub

# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 启动某个服务器
cd packages/server-weather
pnpm dev
```

### Docker 部署

```bash
docker-compose up -d
```

## 📦 包列表

| 包名 | npm | 说明 |
|------|-----|------|
| `@mcp-hub/shared` | - | 共享工具和类型 |
| `@mcp-hub/server-weather` | - | Open-Meteo API 封装 |
| `@mcp-hub/server-translator` | - | 多引擎翻译 |
| `@mcp-hub/server-filesystem` | - | 安全文件操作 |
| `@mcp-hub/server-database` | - | SQLite/MySQL/PostgreSQL |
| `@mcp-hub/server-web-search` | - | 多搜索引擎 |
| `@mcp-hub/server-datetime` | - | 时区/日历/倒计时 |
| `@mcp-hub/server-calculator` | - | 数学表达式求值 |
| `@mcp-hub/server-qrcode` | - | QR 码生成与解析 |

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 许可

MIT © [cosmicdk](https://github.com/cosmicdk)

---

<p align="center">⭐ 如果这个项目对你有用，请给个 Star！</p>
