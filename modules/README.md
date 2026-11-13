# Modules

Surge modules use the `.sgmodule` suffix. Install one in the Surge app via Settings -> Modules -> Install New Module, then paste its raw URL.

## Modules in this repository

| Module | Description | Install URL |
|---|---|---|
| `template.sgmodule` | Empty template with only the header declarations and comments. Copy it to start your own module. | `https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/modules/template.sgmodule` |
| `panel/IP-Check.sgmodule` | Information panel: current outbound IP, location and ISP (via ipinfo.io, no key required). Refreshes hourly. | `https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/modules/panel/IP-Check.sgmodule` |
| `panel/Sub-Info.sgmodule` | Information panel: subscription traffic used / remaining and expiry date, read from the `subscription-userinfo` header. Refreshes hourly. | `https://raw.githubusercontent.com/jovkoch/Surge6-Rules/main/modules/panel/Sub-Info.sgmodule` |

> Never enable a module you have not read. A module can rewrite requests and run scripts. Open the file and review it first.

## Panels

Panels are small cards shown in Surge's policy selection view (iOS) or the Panels menu (Mac). Both panels above are driven by a generic script in the same `panel/` folder; the `.sgmodule` files only wire the script in, so install the `.sgmodule` URL, not the `.js` file.

- **IP Check**: needs no setup. The panel request goes through the proxy, so the IP shown is the exit node's IP.
- **Sub Info**: after installing, open the module's settings in Surge (Modules list -> tap the module) and fill in your proxy subscription URL, then go to the policy selection view and tap the panel's refresh button. The URL is stored on your device only — it is never written to this repository. If your subscription does not return a `subscription-userinfo` header, the panel will say so instead of showing numbers.
