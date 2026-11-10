// Forum archive search: titles, authors and opening texts of the archived threads (index: /forum/search-index.json).
(function () {
  "use strict";
  var form = document.getElementById("forum-search-form");
  if (!form) return;
  var INDEX_URL = "/Website/forum/search-index.json";
  var PAGE_SIZE = 40;
  var textEl = document.getElementById("fs-text");
  var forumEl = document.getElementById("fs-forum");
  var statusEl = document.getElementById("fs-status");
  var listEl = document.getElementById("fs-results");
  var moreEl = document.getElementById("fs-more");
  var data = null;
  var matches = [];
  var shown = 0;
  var terms = [];
  var timer = null;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function highlight(raw) {
    if (!terms.length) return esc(raw);
    var rx = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig");
    // highlight on the plain text only (accents are kept as typed)
    return raw.split(rx).map(function (part, i) { return i % 2 ? "<mark>" + esc(part) + "</mark>" : esc(part); }).join("");
  }
  function render(from, to) {
    var html = "";
    for (var i = from; i < to; i++) {
      var t = matches[i];
      html += '<li class="fresult"><a class="ttitle" href="/Website' + t[6] + '">' + highlight(t[1]) + "</a>" +
        '<div class="fmeta">' + esc(data.forumName[t[2]] || "") + " &middot; by " + highlight(t[3]) + (t[4] ? ", " + esc(t[4]) : "") + " &middot; " + t[5] + " replies</div>" +
        (t[7] ? '<div class="fsnip">' + highlight(t[7]) + "</div>" : "") + "</li>";
    }
    listEl.insertAdjacentHTML("beforeend", html);
  }
  function run() {
    var text = norm(textEl.value.trim());
    var fid = forumEl.value;
    listEl.innerHTML = "";
    moreEl.hidden = true;
    terms = text.split(/\s+/).filter(Boolean);
    if (!data) return;
    if (text.replace(/\s/g, "").length < 3) {
      statusEl.textContent = "Type at least 3 letters.";
      return;
    }
    matches = data.threads.filter(function (t) {
      if (fid && String(t[2]) !== fid && !data.under[fid + ":" + t[2]]) return false;
      return terms.every(function (term) { return t.s.indexOf(term) >= 0; });
    });
    statusEl.textContent = matches.length + " thread" + (matches.length === 1 ? "" : "s") + " found.";
    shown = Math.min(PAGE_SIZE, matches.length);
    render(0, shown);
    moreEl.hidden = shown >= matches.length;
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(run, 150);
  }
  moreEl.addEventListener("click", function () {
    var to = Math.min(shown + PAGE_SIZE, matches.length);
    render(shown, to);
    shown = to;
    moreEl.hidden = shown >= matches.length;
  });
  document.getElementById("fs-reset").addEventListener("click", function () {
    textEl.value = "";
    forumEl.value = "";
    run();
  });
  textEl.addEventListener("input", schedule);
  forumEl.addEventListener("change", run);

  statusEl.textContent = "Loading the search index …";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", INDEX_URL);
  xhr.onload = function () {
    if (xhr.status !== 200) {
      statusEl.textContent = "The search index could not be loaded.";
      return;
    }
    var raw = JSON.parse(xhr.responseText);
    data = { threads: raw.threads, forumName: {}, under: {} };
    raw.forums.forEach(function (f) {
      data.forumName[f[0]] = f[1].split(" › ").pop();
      var o = document.createElement("option");
      o.value = f[0];
      o.textContent = f[1];
      forumEl.appendChild(o);
    });
    // a forum filter includes the sub-forums: the path of every forum is "root › … › forum"
    var pathOf = {};
    raw.forums.forEach(function (f) { pathOf[f[0]] = f[1]; });
    raw.forums.forEach(function (a) {
      raw.forums.forEach(function (b) {
        if (a[0] !== b[0] && pathOf[b[0]].indexOf(pathOf[a[0]] + " › ") === 0) data.under[a[0] + ":" + b[0]] = true;
      });
    });
    data.threads.forEach(function (t) { t.s = norm(t[1] + " " + t[3] + " " + t[7]); });
    statusEl.textContent = "Type at least 3 letters.";
    var q = /[?&]q=([^&]*)/.exec(location.search);
    if (q) {
      textEl.value = decodeURIComponent(q[1].replace(/\+/g, " "));
      run();
    }
  };
  xhr.onerror = function () { statusEl.textContent = "The search index could not be loaded."; };
  xhr.send();
})();
