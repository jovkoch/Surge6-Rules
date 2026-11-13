// Profile Reload & DNS Flush panel script for Surge 6.
// Tap the panel's refresh button to flush the DNS cache and reload the
// current profile, using Surge's own HTTP API via $httpAPI (no auth needed,
// per the official manual: https://manual.nssurge.com/scripting/api.html).
// Endpoints: POST /v1/dns/flush, POST /v1/profiles/reload.
// DNS is flushed first: if the profile reload restarts the engine, the
// flush has already happened. The panel has no update-interval, so it only
// runs when tapped - it never reloads the profile on its own.

function now() {
  return new Date().toLocaleTimeString();
}

function finish(title, content, style) {
  $done({ title: title, content: content, style: style });
}

function fail(message) {
  finish("Reload & DNS Flush", "❌ " + message + "\nLast attempt: " + now(), "alert");
}

try {
  if (typeof $httpAPI !== "function") {
    fail("$httpAPI is not available in this Surge version.");
  } else {
    $httpAPI("POST", "/v1/dns/flush", null, function (flushResult) {
      if (flushResult && flushResult.error) {
        fail("DNS flush failed: " + flushResult.error);
        return;
      }
      $httpAPI("POST", "/v1/profiles/reload", null, function (reloadResult) {
        if (reloadResult && reloadResult.error) {
          fail("Profile reload failed: " + reloadResult.error);
          return;
        }
        finish(
          "Reload & DNS Flush",
          "✅ DNS cache flushed\n✅ Profile reloaded\nLast run: " + now(),
          "info"
        );
      });
    });
  }
} catch (e) {
  fail("Failed: " + e);
}
