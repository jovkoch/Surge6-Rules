# Surge6-Rules

[![GitHub stars](https://img.shields.io/github/stars/jovkoch/Surge6-Rules?style=social)](https://github.com/jovkoch/Surge6-Rules/stargazers)
[![License: MIT](https://img.shields.io/github/license/jovkoch/Surge6-Rules)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/jovkoch/Surge6-Rules)](https://github.com/jovkoch/Surge6-Rules/commits/main)
[![Validate rules](https://github.com/jovkoch/Surge6-Rules/actions/workflows/validate-rules.yml/badge.svg)](https://github.com/jovkoch/Surge6-Rules/actions/workflows/validate-rules.yml)

[English](README.md) | **简体中文**

一套面向 **Surge 6（iOS）** 的分流仓库：自维护规则集 + 可直接套用的配置模板 + 模块模板。

目标很简单：国内直连、海外代理、广告拦截，AI / 流媒体单独分组，规则顺序清晰，后续好维护。

> 本仓库只包含规则和配置模板，**不包含、不提供任何代理节点或机场订阅**。节点请填你自己的。

> 如果这个项目对你有帮助，欢迎点一个 ⭐，能让更多 Surge 用户找到它，也是维护规则最好的动力。发现某个域名走错线路？欢迎提 [Issue](https://github.com/jovkoch/Surge6-Rules/issues/new/choose)，或看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## VLESS

Surge 6 已原生支持 VLESS（iOS 6.0.0+ / Mac 6.12.0+），包括 REALITY 和 XTLS Vision，见[官方 VLESS 文档](https://manual.nssurge.com/policies/vless.html)。`surge.conf` 的 `[Proxy]` 段里有注释版 VLESS 示例——REALITY + Vision、WebSocket + TLS、RAW + TLS + Vision，只有占位符，请填自己的服务器、UUID、SNI 和 REALITY 公钥。XHTTP、HTTPUpgrade、mKCP 和 VLESS Encryption 不支持。

## 马来西亚 / 海外版

如果你在**中国境外**使用 Surge（例如在马来西亚），请用 `surge-malaysia.conf` 而不是 `surge.conf`。分流方向是反过来的：国内服务走回国节点（服务器必须在中国境内，海外节点解不了国内 App 的地区限制），海外服务直连，`FINAL` 也是直连。一键导入：

[surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge-malaysia.conf](surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge-malaysia.conf)

## 快速开始

### 一键导入（iOS，已安装 Surge）

点这个链接即可导入配置模板：

[surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge.conf](surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge.conf)

导入后记得先编辑配置：在 `[Proxy]` 填入你自己的节点，并把 `[Proxy Group]` 各组的成员改成你的节点名。模板默认只有 `DIRECT` 兜底，不改也能导入，但代理组会走直连。

### 方式一：整套配置

Surge App → 配置 → 从 URL 下载配置，粘贴：

```
https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/surge.conf
```

> 注意：用远程链接时，GitHub 上的版本才是生效版本。需要改节点段时，更推荐下载到本地改好后导入本地文件，或 fork 本仓库改成你自己的地址。

### 方式二：只引用规则集

在你现有配置的 `[Rule]` 段按顺序加入（域名集在前、IP 集在后，完整顺序以 `surge.conf` 为准）：

```ini
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/Reject.list,REJECT
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/AI.list,Proxy
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/China.list,DIRECT
GEOIP,CN,DIRECT
FINAL,Proxy,dns-failed
```

## 规则集清单

| 规则集 | 用途 | 模板中策略 |
|---|---|---|
| `rules/Reject.list` | 广告与追踪拦截（起步版） | `REJECT` |
| `rules/AI.list` | OpenAI / ChatGPT、Claude、Gemini 入口、Perplexity、xAI 等 | `🤖 AI` |
| `rules/YouTube.list` | YouTube 与视频 CDN | `📺 Streaming` |
| `rules/Netflix.list` | Netflix 与测速 `fast.com` | `📺 Streaming` |
| `rules/Streaming.list` | Disney+、Max、Hulu、Twitch、Spotify 等 | `📺 Streaming` |
| `rules/Telegram.list` | Telegram 域名 | `💬 Telegram` |
| `rules/Telegram-IP.list` | Telegram IP 段（IP 集，放域名集之后） | `💬 Telegram` |
| `rules/Social.list` | X、Instagram、Facebook、Reddit、Discord、TikTok 国际版等 | `🌍 Global` |
| `rules/Google.list` | Google 基础服务（不含 YouTube） | `🌍 Global` |
| `rules/Microsoft.list` | Microsoft / Office / OneDrive / LinkedIn 等 | `🌍 Global` |
| `rules/Developer.list` | GitHub、GitLab、npm、Docker 等 | `🌍 Global` |
| `rules/Global.list` | 其他海外常用服务精选 | `🌍 Global` |
| `rules/Apple.list` | Apple / iCloud / App Store 等 | `🍎 Apple`（默认直连） |
| `rules/China.list` | 国内常用服务精选（银行、支付、视频、出行、国内 AI 等） | `🏠 Domestic` |
| `rules/Private.list` | 局域网与私有 IP 段 | `DIRECT` |

订阅地址规律：`https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/<文件名>`

## 规则顺序（重要）

Surge 从上到下匹配，**首个命中生效**。本仓库遵循：

1. `Reject` 拦截优先
2. 域名规则集：AI → 流媒体 → Telegram → 社交 → Google / 微软 / 开发者 → Apple → 国内
3. IP 规则集：Telegram-IP、Private、内置 `LAN`——必须在域名集之后，避免不必要的 DNS 解析
4. 国内兜底：`DOMAIN-SUFFIX,cn` → `GEOIP,CN`
5. `FINAL` 最后兜底

## 目录结构

```
Surge6-Rules/
├── surge.conf          # Surge 6 配置模板（在中国境内使用，填入自己的节点后使用）
├── surge-malaysia.conf # Surge 6 配置模板（在中国境外使用，例如马来西亚，填入自己的节点后使用）
├── rules/              # 15 个自维护 RULE-SET (.list，无策略列)
├── modules/            # .sgmodule 模块模板与说明
├── scripts/            # 规则校验脚本（GitHub Actions 同步运行）
├── docs/               # 维护说明
├── LICENSE
└── README.md
```

## 更新日志

见 [CHANGELOG.md](CHANGELOG.md)，当前版本 **v1.2.0**。

## 免责声明

本仓库仅供学习与个人网络管理使用，规则内容来自公开域名信息整理。请遵守当地法律法规和 Surge 的使用条款。

## License

MIT
