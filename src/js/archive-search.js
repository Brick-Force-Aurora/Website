// News archive search: free text, category and date range.
// Results are only shown when at least one filter (category or date) is active or the text has 3+ letters.
(function () {
  "use strict";
  var form = document.getElementById("archive-search-form");
  if (!form) return;

  var INDEX_URL = "/Website/archive/news/search-index.json";
  var MIN_LETTERS = 3;
  var PAGE_SIZE = 40;
  var HINT = "Type at least " + MIN_LETTERS + " letters or choose a category or a date range.";

  var textEl = document.getElementById("s-text");
  var catEl = document.getElementById("s-cat");
  var fromEl = document.getElementById("s-from");
  var toEl = document.getElementById("s-to");
  var resetEl = document.getElementById("s-reset");
  var statusEl = document.getElementById("search-status");
  var listEl = document.getElementById("search-results");
  var moreEl = document.getElementById("search-more");

  var data = null;
  var matches = [];
  var shown = 0;
  var terms = [];
  var timer = null;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function regexFor(list) {
    return new RegExp("(" + list.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig");
  }

  // escapes the text and wraps every search term in <mark>
  function highlight(raw) {
    if (!terms.length) return esc(raw);
    return raw
      .split(regexFor(terms))
      .map(function (part, i) { return i % 2 ? "<mark>" + esc(part) + "</mark>" : esc(part); })
      .join("");
  }

  function snippet(post) {
    var text = post.x;
    if (!terms.length) return esc(text.length > 220 ? text.slice(0, 220) + "…" : text);
    var at = text.toLowerCase().indexOf(terms[0]);
    if (at < 0) return esc(text.slice(0, 220)) + (text.length > 220 ? "…" : "");
    var start = Math.max(0, at - 70);
    var end = Math.min(text.length, at + 170);
    return (start > 0 ? "…" : "") + highlight(text.slice(start, end)) + (end < text.length ? "…" : "");
  }

  function render(from, to) {
    var html = "";
    for (var i = from; i < to; i++) {
      var p = matches[i];
      html +=
        '<li class="result">' +
        '<span class="r-date">' + esc(p.l) + "</span>" +
        '<span class="r-cat cat-' + esc(p.c) + '">' + esc(p.k) + "</span>" +
        '<h3><a href="/Website/archive/news/' + p.y + "/#post-" + p.i + '">' + highlight(p.t) + "</a></h3>" +
        (p.s ? '<h4 class="r-sub">' + highlight(p.s) + "</h4>" : "") +
        '<p class="r-snippet">' + snippet(p) + "</p>" +
        "</li>";
    }
    listEl.insertAdjacentHTML("beforeend", html);
  }

  function updateUrl(text, cat, from, to) {
    var q = [];
    if (text) q.push("q=" + encodeURIComponent(text));
    if (cat) q.push("cat=" + encodeURIComponent(cat));
    if (from) q.push("from=" + from);
    if (to) q.push("to=" + to);
    try {
      history.replaceState(null, "", location.pathname + (q.length ? "?" + q.join("&") : ""));
    } catch (e) {
      /* not important */
    }
  }

  function run() {
    var text = textEl.value.trim();
    var cat = catEl.value;
    var from = fromEl.value;
    var to = toEl.value;
    var textActive = text.length >= MIN_LETTERS;
    var filterActive = !!(cat || from || to);
    updateUrl(text, cat, from, to);

    listEl.innerHTML = "";
    moreEl.hidden = true;
    matches = [];
    shown = 0;

    if (!textActive && !filterActive) {
      statusEl.textContent = HINT;
      return;
    }
    if (!data) {
      statusEl.textContent = "Loading the archive…";
      return;
    }
    if (from && to && from > to) {
      statusEl.textContent = "The start date is after the end date.";
      return;
    }

    terms = textActive ? text.toLowerCase().split(/\s+/).filter(Boolean) : [];
    matches = data.filter(function (p) {
      if (cat && p.c !== cat) return false;
      if (from && p.d < from) return false;
      if (to && p.d > to) return false;
      for (var i = 0; i < terms.length; i++) {
        if (p._h.indexOf(terms[i]) < 0) return false;
      }
      return true;
    });

    var note = text.length && !textActive ? " (the text is used from " + MIN_LETTERS + " letters on)" : "";
    statusEl.textContent = matches.length
      ? matches.length + (matches.length === 1 ? " result" : " results") + note
      : "No posts found" + note + ".";
    shown = Math.min(PAGE_SIZE, matches.length);
    render(0, shown);
    moreEl.hidden = shown >= matches.length;
  }

  function later() {
    clearTimeout(timer);
    timer = setTimeout(run, 150);
  }

  moreEl.addEventListener("click", function () {
    var next = Math.min(shown + PAGE_SIZE, matches.length);
    render(shown, next);
    shown = next;
    moreEl.hidden = shown >= matches.length;
  });
  textEl.addEventListener("input", later);
  [catEl, fromEl, toEl].forEach(function (el) { el.addEventListener("change", run); });
  resetEl.addEventListener("click", function () {
    textEl.value = "";
    catEl.value = "";
    fromEl.value = "";
    toEl.value = "";
    run();
    textEl.focus();
  });

  // values from the address (shared links)
  (function readUrl() {
    var m;
    var s = location.search;
    if ((m = /[?&]q=([^&]*)/.exec(s))) textEl.value = decodeURIComponent(m[1].replace(/\+/g, " "));
    if ((m = /[?&]cat=([^&]*)/.exec(s))) catEl.value = decodeURIComponent(m[1]);
    if ((m = /[?&]from=(\d{4}-\d{2}-\d{2})/.exec(s))) fromEl.value = m[1];
    if ((m = /[?&]to=(\d{4}-\d{2}-\d{2})/.exec(s))) toEl.value = m[1];
  })();

  fetch(INDEX_URL)
    .then(function (r) { return r.json(); })
    .then(function (d) {
      d.forEach(function (p) { p._h = (p.t + " " + p.s + " " + p.x).toLowerCase(); });
      data = d;
      run();
    })
    .catch(function () {
      statusEl.textContent = "The search index could not be loaded.";
    });
})();
