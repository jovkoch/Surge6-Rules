// Subscription Info Panel — Surge generic panel script.
// Fetches your proxy subscription URL and reads the standard
// `subscription-userinfo` response header:
//   upload=<bytes>; download=<bytes>; total=<bytes>; expire=<unix timestamp>
// Shows used / total traffic, remaining traffic and the expiry date.
// The subscription URL is NOT stored in this repository: set it in the
// module's own settings after installing Sub-Info.sgmodule in Surge
// (the module declares it as a parameter; Surge keeps it on your device).
// Runs as a generic script backing the [Panel] entry in Sub-Info.sgmodule.
// Official docs: https://manual.nssurge.com/tools/panel.html

function getArg(name) {
  var arg = (typeof $argument !== "undefined" && $argument) || "";
  var parts = String(arg).split("&");
  for (var i = 0; i < parts.length; i++) {
    var kv = parts[i].split("=");
    if (kv[0] === name) return decodeURIComponent((kv[1] || "").replace(/\+/g, " "));
  }
  return "";
}

function formatBytes(bytes) {
  if (!isFinite(bytes) || bytes < 0) return "-";
  var units = ["B", "KB", "MB", "GB", "TB"];
  var i = 0;
  var value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return value.toFixed(value >= 100 || i === 0 ? 0 : 1) + " " + units[i];
}

function formatDate(unixSeconds) {
  var d = new Date(unixSeconds * 1000);
  var y = d.getFullYear();
  var m = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return y + "-" + m + "-" + day;
}

var subUrl = getArg("url");
if (!subUrl) {
  $done({
    title: "Subscription",
    content: "No subscription URL set.\nOpen the module settings in Surge and fill in your subscription link, then refresh this panel.",
    style: "alert",
  });
  return;
}

$httpClient.get({ url: subUrl, headers: { "User-Agent": "Surge" } }, function (error, response, data) {
  if (error) {
    $done({
      title: "Subscription",
      content: "Request failed: " + error,
      style: "error",
    });
    return;
  }
  var headers = response.headers || {};
  var userInfo = "";
  Object.keys(headers).forEach(function (key) {
    if (key.toLowerCase() === "subscription-userinfo") userInfo = headers[key];
  });
  if (!userInfo) {
    $done({
      title: "Subscription",
      content: "No subscription-userinfo header returned.\nThis subscription does not report traffic usage.",
      style: "alert",
    });
    return;
  }
  var info = {};
  userInfo.split(";").forEach(function (pair) {
    var kv = pair.trim().split("=");
    if (kv.length === 2) info[kv[0].trim()] = kv[1].trim();
  });
  var upload = parseInt(info.upload || "0", 10) || 0;
  var download = parseInt(info.download || "0", 10) || 0;
  var total = parseInt(info.total || "0", 10) || 0;
  var expire = parseInt(info.expire || "0", 10) || 0;
  var used = upload + download;
  var remaining = total > 0 ? Math.max(total - used, 0) : 0;
  var percent = total > 0 ? (used / total) * 100 : 0;

  var title;
  if (total > 0) {
    title = "Used " + formatBytes(used) + " / " + formatBytes(total);
  } else {
    title = "Used " + formatBytes(used);
  }
  var lines = [];
  if (total > 0) {
    lines.push("Remaining: " + formatBytes(remaining) + " (" + percent.toFixed(1) + "% used)");
  }
  if (expire > 0) {
    var daysLeft = Math.ceil((expire * 1000 - Date.now()) / 86400000);
    lines.push("Expires: " + formatDate(expire) + " (" + (daysLeft >= 0 ? daysLeft + " days left" : "expired") + ")");
  }
  var style = "good";
  if (total > 0 && percent >= 90) style = "error";
  else if ((total > 0 && percent >= 75) || (expire > 0 && Math.ceil((expire * 1000 - Date.now()) / 86400000) <= 7)) style = "alert";
  $done({
    title: title,
    content: lines.join("\n") || "No usage data available.",
    style: style,
  });
});
