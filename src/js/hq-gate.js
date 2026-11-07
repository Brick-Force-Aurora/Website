// Brick HQ is a Christmas present for the players: it opens on December 24, 2026 (local time).
// On localhost (development) it is always open.
(function () {
  var RELEASE = new Date(2026, 11, 24, 0, 0, 0).getTime();
  var dev = /^(localhost|127\.0\.0\.1|\[::1\]|.*\.localhost)$/.test(location.hostname);
  if (dev || Date.now() >= RELEASE) return;
  document.documentElement.className += ' hq-locked'; // hides the menu entry (see hq-extra.css)
  if (/\/game\/(ranking|players)\//.test(location.pathname)) {
    location.replace('/Website/');
  }
})();
