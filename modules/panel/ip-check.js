// IP Check Panel — Surge generic panel script.
// Queries ipinfo.io/json (free, no key required, HTTPS) for the current
// outbound IP and shows its location and ISP on the Surge information panel.
// The request goes through the proxy, so the IP shown is the exit node's IP.
// Runs as a generic script backing the [Panel] entry in IP-Check.sgmodule.
// Official docs: https://manual.nssurge.com/tools/panel.html

$httpClient.get("https://ipinfo.io/json", function (error, response, data) {
  if (error) {
    $done({
      title: "IP Check",
      content: "Request failed: " + error,
      style: "error",
    });
    return;
  }
  var info;
  try {
    info = JSON.parse(data);
  } catch (e) {
    $done({
      title: "IP Check",
      content: "Could not parse the IP lookup response.",
      style: "error",
    });
    return;
  }
  if (!info.ip) {
    $done({
      title: "IP Check",
      content: "Lookup failed: " + (info.error ? JSON.stringify(info.error) : "no IP returned"),
      style: "error",
    });
    return;
  }
  var location = [info.city, info.region, info.country].filter(Boolean).join(", ");
  var lines = [];
  if (location) lines.push(location);
  if (info.org) lines.push(info.org);
  if (info.timezone) lines.push(info.timezone);
  $done({
    title: info.ip,
    content: lines.join("\n") || "No location info returned.",
    style: "good",
  });
});
