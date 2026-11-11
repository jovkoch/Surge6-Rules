# Maintenance Guide

## Adding a rule

1. Pick the right type: `DOMAIN` for one exact hostname, `DOMAIN-SUFFIX` for a site and all its subdomains, `IP-CIDR` / `IP-CIDR6` with `,no-resolve` for IP ranges.
2. Put it in the correct category file under `rules/`, roughly in alphabetical order, and keep the header comments at the top of each file.
3. Self-check before committing: no policy column in a `.list` file (no trailing `,DIRECT` or `,Proxy`; the parameters `no-resolve` and `extended-matching` are the only allowed extras), and no duplicate lines.
4. Use a clear commit message, for example: `rules(AI): add xxx.com`.

## Validation

Check every line against an allowlist of rule types, validate IP CIDR notation, and scan for duplicates across files. A GitHub Actions workflow for this check is planned.
