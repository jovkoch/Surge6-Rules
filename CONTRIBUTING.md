# Contributing

Thanks for helping improve Surge6-Rules. The most useful contribution is a
domain that is routed the wrong way.

## Report a misrouted domain

Open an issue with the **Rule request** template and include:

1. The domain, for example `example.com`
2. What it should be: `DIRECT` (China), a proxy group, or `REJECT`
3. Which app or website it belongs to, and what goes wrong today

## Add a rule yourself

1. Pick the right category file under `rules/` (see the table in the README).
2. Pick the right type: `DOMAIN` for one exact hostname, `DOMAIN-SUFFIX` for a
   site and all of its subdomains, `IP-CIDR` / `IP-CIDR6` (with `,no-resolve`)
   for IP ranges.
3. Rules in `.list` files never carry a policy — no trailing `,DIRECT` or
   `,Proxy`. The only allowed extra parameters are `no-resolve` and
   `extended-matching`.
4. Do not duplicate a domain that already exists in another file; the earlier
   rule set in `surge.conf` order wins.
5. Run the validator before opening a pull request:

   ```bash
   python3 scripts/validate_rules.py
   ```

6. Use a clear commit message, for example `rules(AI): add example.com`.

## What not to submit

- Proxy nodes, subscriptions, accounts, or credentials of any kind
- Domains you have not verified belong to the service you name
