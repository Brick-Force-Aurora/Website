// Season Overview: switches between the season panels when a tab on the left is clicked.
(function () {
  "use strict";
  var root = document.querySelector(".seasons-overview");
  if (!root) {
    return;
  }
  var tabs = root.querySelectorAll(".tabs-vertical li");
  var seasons = root.querySelectorAll("article.season");

  function show(index) {
    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.classList.toggle("selected", i === index);
    });
    Array.prototype.forEach.call(seasons, function (season, i) {
      season.style.display = i === index ? "block" : "none";
      season.classList.toggle("current", i === index);
    });
  }

  Array.prototype.forEach.call(tabs, function (tab, i) {
    tab.style.cursor = "pointer";
    tab.addEventListener("click", function () {
      show(i);
    });
  });

  var start = 0;
  Array.prototype.forEach.call(tabs, function (tab, i) {
    if (tab.classList.contains("selected")) {
      start = i;
    }
  });
  show(start);
})();
