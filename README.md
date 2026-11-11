# Surge6-Rules

[![GitHub stars](https://img.shields.io/github/stars/jovkoch/Surge6-Rules?style=social)](https://github.com/jovkoch/Surge6-Rules/stargazers)
[![License: MIT](https://img.shields.io/github/license/jovkoch/Surge6-Rules)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/jovkoch/Surge6-Rules)](https://github.com/jovkoch/Surge6-Rules/commits/main)
[![Validate rules](https://github.com/jovkoch/Surge6-Rules/actions/workflows/validate-rules.yml/badge.svg)](https://github.com/jovkoch/Surge6-Rules/actions/workflows/validate-rules.yml)

**English** | [简体中文](README.zh-CN.md)

> **中文简介**：一套面向 Surge 6（iOS）的分流规则仓库——国内直连、海外代理、广告拦截，AI 与流媒体单独分组。包含可直接套用的配置模板和 15 个自维护规则集（356 条规则），不包含任何节点或机场订阅。点下方链接可一键导入 Surge。

**One-click import (iOS, with Surge installed):**
[surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge.conf](surge:///install-config?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjovkoch%2FSurge6-Rules%2Fmain%2Fsurge.conf)

Or copy the raw profile URL manually:

```
https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/surge.conf
```

> If this project helps you, please consider giving it a ⭐ — it helps other Surge users find it, and it is the best signal that the rules are worth maintaining. Found a domain routed the wrong way? [Open an issue](https://github.com/jovkoch/Surge6-Rules/issues/new/choose) or see [CONTRIBUTING.md](CONTRIBUTING.md).

## Quick Start

### Option 1: Full profile (recommended for new users)

1. Edit [`surge.conf`](surge.conf) first: add your own nodes under `[Proxy]`, and update the members of each group under `[Proxy Group]` to your node names. As shipped, the groups contain only `DIRECT` as a fallback, so the profile imports cleanly but proxy groups will go direct until you add nodes.
2. In the Surge app: Profile -> Download Profile from URL, then paste:

```
https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/surge.conf
```

> Note: with a remote URL, the version on GitHub is what takes effect. If you need to edit the node section, it is usually easier to download the file, edit it locally, and import it as a local file — or fork this repository and use your own URL.

### Option 2: Rule sets only

Add these lines to the `[Rule]` section of your existing profile, in this order (domain sets first, IP sets after them):

```ini
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/Reject.list,REJECT
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/AI.list,Proxy
RULE-SET,https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/China.list,DIRECT
# See the table below for the rest; surge.conf is the reference for the full order.
GEOIP,CN,DIRECT
FINAL,Proxy,dns-failed
```

## Rule Sets

| Rule set | Purpose | Policy in the template |
|---|---|---|
| `rules/Reject.list` | Ad and tracker blocking (starter edition) | `REJECT` |
| `rules/AI.list` | OpenAI / ChatGPT, Claude, Gemini entry points, Perplexity, xAI, etc. | `🤖 AI` |
| `rules/YouTube.list` | YouTube and its video CDN | `📺 Streaming` |
| `rules/Netflix.list` | Netflix and the `fast.com` speed test | `📺 Streaming` |
| `rules/Streaming.list` | Disney+, Max, Hulu, Twitch, Spotify, etc. | `📺 Streaming` |
| `rules/Telegram.list` | Telegram domains | `💬 Telegram` |
| `rules/Telegram-IP.list` | Telegram IP ranges (an IP set — place it after all domain sets) | `💬 Telegram` |
| `rules/Social.list` | X, Instagram, Facebook, Reddit, Discord, international TikTok, etc. | `🌍 Global` |
| `rules/Google.list` | Core Google services (YouTube excluded) | `🌍 Global` |
| `rules/Microsoft.list` | Microsoft, Office, OneDrive, LinkedIn, etc. | `🌍 Global` |
| `rules/Developer.list` | GitHub, GitLab, npm, Docker, etc. | `🌍 Global` |
| `rules/Global.list` | Other popular overseas services | `🌍 Global` |
| `rules/Apple.list` | Apple, iCloud, App Store, etc. | `🍎 Apple` (direct by default) |
| `rules/China.list` | Popular China services: banking, payments, video, travel, domestic AI, etc. | `🏠 Domestic` |
| `rules/Private.list` | LAN and private IP ranges | `DIRECT` |

Raw URL pattern: `https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/rules/<file name>`

## Rule Order (Important)

Surge matches rules from top to bottom; **the first match wins**. This repository follows this order:

1. `Reject` blocking first
2. Domain rule sets: AI -> Streaming -> Telegram -> Social -> Google / Microsoft / Developer -> Apple -> China
3. IP rule sets: Telegram-IP, Private, and the built-in `LAN` set — these must stay after all domain sets to avoid unnecessary DNS resolution
4. China fallback: `DOMAIN-SUFFIX,cn`, then `GEOIP,CN`
5. `FINAL` as the last catch-all

## Repository Layout

```
Surge6-Rules/
├── surge.conf          # Surge 6 profile template (add your own nodes before use)
├── rules/              # 15 self-maintained RULE-SET files (.list, no policy column)
├── modules/            # .sgmodule template and notes
├── docs/               # Maintenance guide
├── LICENSE
└── README.md
```

## Maintenance Notes

- Each `.list` file is a `RULE-SET` file: one rule per line, **with no policy**, and comments start with `#`. See the [Surge manual - Rule Sets](https://manual.nssurge.com/rules/ruleset.html).
- Before adding a domain, pick the right category: China direct traffic goes to `China.list`, overseas services go to the matching service set, and ads go to `Reject.list`.
- Do not duplicate a domain across sets; the earlier set wins. `YouTube`, `Netflix`, and `Telegram-IP` are intentionally split out of the larger categories.
- This is a curated starter edition, not a full-size database. For 100k-scale coverage, you can reference upstream rule sets such as blackmatrix7 or Sukka alongside these self-maintained sets — just keep the order above.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history. The current release is **v1.1.0**.

## Disclaimer

This repository is for learning and personal network management only. The rules were compiled from publicly known service domains. Please comply with local laws and regulations and with Surge's terms of use.

## License

MIT
