# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2026-11-13

### Fixed

- Subscription Info panel: the subscription URL is now passed to the script verbatim instead of being parsed as a `url=` query parameter, so subscription links containing `&` (e.g. `?token=xxx&flag=1`) are no longer truncated at the first `&` and fetched incomplete. The old `url=<link>` form is still accepted.

## [1.4.0] - 2026-11-13

### Added

- Information panels under `modules/panel/`: **IP Check** (`IP-Check.sgmodule` + `ip-check.js`, current outbound IP / location / ISP via ipinfo.io, no key required) and **Subscription Info** (`Sub-Info.sgmodule` + `sub-info.js`, traffic used / remaining and expiry date from the `subscription-userinfo` header). Both refresh hourly and follow the official Information Panel format (`[Panel]` + generic script). The subscription URL is entered in the module settings in Surge and stored on the device only — it is never committed to this repository.

## [1.3.0] - 2026-11-13

### Changed

- Telegram IP matching now uses autonomous systems instead of a fixed CIDR list: `rules/Telegram-IP.list` (11 IP ranges) is replaced by `rules/Telegram-ASN.list` with 5 `IP-ASN` rules (AS62041, AS62014, AS59930, AS44907, AS211157). Telegram's new IPs are covered automatically, with no CIDR maintenance. Domain rules in `rules/Telegram.list` are unchanged. Total rules: 356 -> 350.

## [1.2.0] - 2026-11-12

### Added

- Malaysia / abroad profile template (`surge-malaysia.conf`): routing is inverted for use outside mainland China — China services go through a China-return node, overseas services go direct, and `FINAL` is direct
- VLESS examples in `surge.conf` (REALITY + Vision, WebSocket + TLS, RAW + TLS + Vision), following the official Surge 6 manual; VLESS requires Surge iOS 6.0.0+ / Mac 6.12.0+
- VLESS and Malaysia / abroad sections in both READMEs

## [1.1.0] - 2026-11-11

### Added

- Bilingual README header with a full Chinese edition (`README.zh-CN.md`)
- Badges (GitHub stars, license, last commit, rule validation) and a one-click Surge import link
- `CONTRIBUTING.md` and GitHub issue templates for rule requests and misrouted domains
- Automated rule validation: `scripts/validate_rules.py` runs locally and in GitHub Actions on every push and pull request

## [1.0.0] - 2026-11-11

### Added

- Initial release
- Surge 6 profile template (`surge.conf`) with policy groups for Proxy, AI, Streaming, Telegram, Apple, Global, Domestic, and Final
- 15 self-maintained rule sets with 356 unique rules: Reject, AI, YouTube, Netflix, Streaming, Telegram, Telegram-IP, Social, Google, Microsoft, Developer, Global, Apple, China, Private
- Surge module template (`modules/template.sgmodule`) and a maintenance guide
