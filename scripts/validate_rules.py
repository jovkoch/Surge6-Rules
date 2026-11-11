#!/usr/bin/env python3
"""Validate Surge RULE-SET files in rules/ and the references in surge.conf.

Checks, for every .list file:
  - rule type is in the allowlist
  - IP-CIDR / IP-CIDR6 values are valid networks
  - no policy column (only no-resolve / extended-matching params allowed)
  - no duplicate (type, value) pair across all files
And for surge.conf:
  - every raw.githubusercontent.com RULE-SET URL points to a file that exists
Exit code 0 means everything passed.
"""
import ipaddress
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ALLOWED = {
    "DOMAIN", "DOMAIN-SUFFIX", "DOMAIN-KEYWORD", "DOMAIN-WILDCARD",
    "IP-CIDR", "IP-CIDR6", "IP-ASN", "USER-AGENT", "PROCESS-NAME",
    "HOSTNAME-TYPE", "PROTOCOL",
}
ALLOWED_PARAMS = {"no-resolve", "extended-matching"}

def main() -> int:
    errors, seen = [], {}
    rules_dir = ROOT / "rules"
    files = sorted(rules_dir.glob("*.list"))
    if not files:
        print("No .list files found under rules/")
        return 1
    for path in files:
        for lineno, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            line = raw.strip()
            if not line or line.startswith(("#", "//", ";")):
                continue
            parts = [p.strip() for p in line.split(",")]
            rtype = parts[0]
            where = f"{path.name}:{lineno}"
            if rtype not in ALLOWED:
                errors.append(f"{where}: unknown rule type in '{line}'")
                continue
            if len(parts) < 2 or not parts[1]:
                errors.append(f"{where}: missing value in '{line}'")
                continue
            for extra in parts[2:]:
                if extra not in ALLOWED_PARAMS:
                    errors.append(f"{where}: unexpected parameter/policy '{extra}' in '{line}'")
            if rtype in ("IP-CIDR", "IP-CIDR6"):
                try:
                    ipaddress.ip_network(parts[1])
                except ValueError as exc:
                    errors.append(f"{where}: invalid CIDR '{parts[1]}' ({exc})")
            key = (rtype, parts[1].lower())
            if key in seen:
                errors.append(f"{where}: duplicate of {seen[key]} -> '{line}'")
            else:
                seen[key] = where
    conf = ROOT / "surge.conf"
    if conf.exists():
        text = conf.read_text(encoding="utf-8")
        for rel in re.findall(r"raw\.githubusercontent\.com/jovkoch/Surge6-Rules/main/(rules/[^\s,]+)", text):
            if not (ROOT / rel).exists():
                errors.append(f"surge.conf references missing file: {rel}")
    if errors:
        print("Validation FAILED:")
        for e in errors:
            print(" -", e)
        return 1
    print(f"Validation passed: {len(files)} rule sets, {len(seen)} unique rules.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
