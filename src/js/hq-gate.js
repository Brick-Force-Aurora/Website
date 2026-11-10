// Release schedule (local time of the visitor), December 2026:
//   Dec 23  Brick HQ rankings (/game/ranking/)
//   Dec 24  Brick HQ player profiles and maps (/game/players/, /game/maps/) and the links to them from the forum
//   Dec 25  the archived forum (/forum/)
// On localhost (development) everything is always open.
// Before its date a section is hidden (classes on <html>, see hq-extra.css and forum.css) and its pages send the visitor to the home page.
(function () {
  var now = Date.now();
  var RANKING = new Date(2026, 11, 23, 0, 0, 0).getTime();
  var PROFILES = new Date(2026, 11, 24, 0, 0, 0).getTime();
  var FORUM = new Date(2026, 11, 25, 0, 0, 0).getTime();
  var dev = /^(localhost|127\.0\.0\.1|\[::1\]|.*\.localhost)$/.test(location.hostname);
  if (dev) return;
  var path = location.pathname;
  var cls = "";
  if (now < RANKING) cls += " hq-locked"; // hides the whole Brick HQ menu entry
  if (now < PROFILES) cls += " hq-profiles-locked"; // hides playerlist / maplist entries and the HQ links of the forum
  if (now < FORUM) cls += " forum-locked"; // hides the forum menu entry
  document.documentElement.className += cls;
  if (
    (now < RANKING && /\/game\/ranking\//.test(path)) ||
    (now < PROFILES && /\/game\/(players|maps)\//.test(path)) ||
    (now < FORUM && /\/forum\//.test(path))
  ) {
    location.replace('/Website/');
    return;
  }
  // links to player profiles and maps (rankings, forum, ...) are shown as plain text until they are open
  if (now < PROFILES) {
    document.addEventListener('DOMContentLoaded', function () {
      Array.prototype.forEach.call(document.querySelectorAll('a[href*="/game/players/"], a[href*="/game/maps/"]'), function (a) {
        if (/\/game\/(players|maps)\//.test(a.getAttribute('href') || '') && !a.closest('.navigation')) {
          var span = document.createElement('span');
          span.className = a.className + ' link-locked';
          while (a.firstChild) span.appendChild(a.firstChild);
          a.parentNode.replaceChild(span, a);
        }
      });
    });
  }
})();
