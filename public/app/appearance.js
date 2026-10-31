/* Synchronous head bootstrap shared by web and Capacitor: no first-paint flash.
 * Only the preference is persisted, separate from mathematical/session state. */
(function () {
  'use strict';
  var key = 'calcura.appearance.v1';
  var root = document.documentElement;
  var preference = 'auto';
  var timer;
  function valid(value) { return value === 'day' || value === 'night' || value === 'auto'; }
  try { var saved = localStorage.getItem(key); if (valid(saved)) preference = saved; } catch (_) {}
  function sync() {
    var now = new Date();
    var hour = now.getHours();
    var resolved = preference === 'auto' ? (hour >= 19 || hour < 7 ? 'night' : 'day') : preference;
    var changed = root.dataset.appearance !== resolved || root.dataset.appearancePreference !== preference;
    root.dataset.appearance = resolved;
    root.dataset.appearancePreference = preference;
    root.style.colorScheme = resolved === 'night' ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = resolved === 'night' ? '#111827' : '#1b1a1f';
    if (changed) window.dispatchEvent(new Event('calcura:appearance'));
    clearTimeout(timer);
    // One foreground timer also catches clock, date and timezone changes.
    // Always read the actual local clock after suspension.
    if (preference === 'auto' && !document.hidden) {
      var boundary = hour < 7 ? 7 : hour < 19 ? 19 : 31;
      var untilBoundary = (boundary - hour) * 3600000 - now.getMinutes() * 60000
        - now.getSeconds() * 1000 - now.getMilliseconds();
      timer = setTimeout(sync, Math.max(1, Math.min(30000, untilBoundary)));
    }
  }
  window.calcuraSetAppearance = function (value) {
    if (!valid(value)) return;
    preference = value;
    try { localStorage.setItem(key, value); } catch (_) {}
    sync();
  };
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : 'auto';
      sync();
    }
  });
  window.addEventListener('focus', sync);
  window.addEventListener('pageshow', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}());
