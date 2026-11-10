/*
 * Bricktastic X-Mas Calendar (fan re-creation).
 * Door N can be opened on N December (1-25). Every door hides one festive item of the old shop; the item of a door is
 * the same for every visitor (a fixed shuffle per year), so all doors of earlier days are already open and show their
 * item icon. Only today's door has to be opened by clicking it; nothing is stored on a server and no login is needed
 * (the click is remembered in this browser, localStorage).
 *
 * Doors 23, 24 and 25 are special: they announce the release steps (see js/hq-gate.js):
 *   door 23 - Brick HQ rankings, door 24 - player profiles and maps, door 25 - the archived forum.
 *
 * To try it outside of December, add ?date=12-07 (or ?date=2026-12-07) to the page address.
 * This only works on localhost (development); on the live site the real date is always used.
 */
(function () {
  "use strict";

  var ICONS = "/Website/images/items/";
  // Festive items of the old Brick-Force shop (names and icons of the item data of this site); one per door
  var ITEMS = [
    { name: "Santa Jacket", icon: "icon_Xmas_body1.png" },
    { name: "Santa Pants", icon: "icon_Xmas_boots1.png" },
    { name: "Rudolph Jacket", icon: "icon_Xmas_body2.png" },
    { name: "Rudolph Pants", icon: "icon_Xmas_boots2.png" },
    { name: "Chimney Sweep Jacket", icon: "icon_Xmas_body3.png" },
    { name: "Chimney Sweep Pants", icon: "icon_Xmas_boots3.png" },
    { name: "Snowball Menace", icon: "icon_Xmas_bomb2.png" },
    { name: "Shooting Star", icon: "icon_Xmas_rollinggun.png" },
    { name: "Porky Hog", icon: "icon_Xmas_piggun.png" },
    { name: "Bazooka", icon: "icon_Xmas_bazooka.png" },
    { name: "Candy Stick", icon: "icon_Xmas_stick1.png" },
    { name: "Christmas Bell", icon: "icon_Xmas_stick2.png" },
    { name: "Chimney Sweep Stick", icon: "icon_Xmas_stick3.png" },
    { name: "Grape Juice", icon: "icon_Xmas_winebottle.png" },
    { name: "Christmas Bauble Grenade", icon: "icon_Xmas_bomb1.png" },
    { name: "Four-Leaf Clover", icon: "icon_Xmas_lucky.png" },
    { name: "Lucky Pig Canteen", icon: "icon_Xmas_pigbottle.png" },
    { name: "Santa Hat", icon: "icon_Xmas_helmet1.png" },
    { name: "Rudolph Hat", icon: "icon_Xmas_helmet2.png" },
    { name: "Santa Beard", icon: "icon_Xmas_mask1.png" },
    { name: "Santa Snowboard", icon: "icon_Xmas_bag1.png" },
    { name: "Rudolph Backpack", icon: "icon_Xmas_bag2.png" },
    { name: "Santa Glove", icon: "icon_Xmas_m_mashinegun_r1.png" },
    { name: "Snowman Broomstick", icon: "icon_winter_stick01.png" },
    { name: "Santa Pack", icon: "Icon_santaset.png" },
  ];
  var MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // release announcements of the doors 23-25 (shown in addition to the item of the door)
  var SPECIAL = {
    23: {
      value: "Brick HQ rankings unlocked",
      headline: "The Brick HQ rankings are open!",
      text: "Our Christmas present for all players, part 1: the rankings are open from today. The player profiles and maps follow tomorrow.",
      href: "/Website/game/ranking/",
      linkText: "Visit the rankings",
    },
    24: {
      value: "Brick HQ profiles unlocked",
      headline: "Player profiles and maps are open!",
      text: "Our Christmas present for all players, part 2: every player profile and the maplist are open from today.",
      href: "/Website/game/players/",
      linkText: "Visit the player list",
    },
    25: {
      value: "Forum archive unlocked",
      headline: "The forum archive is open!",
      text: "Merry Christmas! The old Brick-Force forum is back as a read-only archive, with threads, members and images restored from the Wayback Machine.",
      href: "/Website/forum/",
      linkText: "Visit the forum",
    },
  };

  var calendar = document.querySelector(".advent-calendar .windows");
  if (!calendar) {
    return;
  }

  // "today" - or the date from ?date=MM-DD / ?date=YYYY-MM-DD for testing
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var dev = /^(localhost|127\.0\.0\.1|\[::1\]|.*\.localhost)$/.test(window.location.hostname);
  var override = dev ? /[?&]date=(?:(\d{4})-)?(\d{1,2})-(\d{1,2})/.exec(window.location.search) : null;
  if (override) {
    year = override[1] ? parseInt(override[1], 10) : year;
    month = parseInt(override[2], 10);
    day = parseInt(override[3], 10);
  }

  // fixed shuffle of the items for this year (seeded, so every visitor sees the same doors)
  function shuffled(seed) {
    var list = ITEMS.slice();
    var s = seed >>> 0;
    function rnd() {
      s = (s + 0x6d2b79f5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }
  var order = shuffled(year);
  function itemOf(n) {
    return order[(n - 1) % order.length];
  }

  var storageKey = "bf-advent-" + year + (override ? "-test" : "");
  var opened = {};
  try {
    opened = JSON.parse(window.localStorage.getItem(storageKey)) || {};
  } catch (e) {
    opened = {};
  }

  function save() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(opened));
    } catch (e) {
      /* private mode etc. - the calendar still works for this visit */
    }
  }

  function showPresent(n, isNew) {
    var sp = SPECIAL[n];
    var it = itemOf(n);
    var overlay = document.createElement("div");
    overlay.className = "advent-overlay";
    var unlock = sp
      ? '<div class="advent-unlock">' +
        '<p class="headline"></p>' +
        '<p class="text"></p>' +
        '<p><a class="hq-link" href="' + sp.href + '"></a></p>' +
        "</div>"
      : "";
    overlay.innerHTML =
      '<div class="advent-box' + (sp ? " special" : "") + '" role="dialog" aria-modal="true">' +
      '<a class="advent-x" href="#" title="Close"></a>' +
      '<div class="advent-text">' +
      '<p class="lead">' + "Santa Brick has added the following to your inventory:" + "</p>" +
      '<p class="item"></p>' +
      unlock +
      '<button type="button" class="advent-ok">Ok!</button>' +
      '<p class="advent-note">Fan re-creation of the original calendar &ndash; the item is not actually added to your inventory.</p>' +
      "</div>" +
      '<p class="icon"><img alt="" src="' + ICONS + it.icon + '"></p>' +
      "</div>";
    overlay.querySelector(".item").textContent = it.name;
    if (sp) {
      overlay.querySelector(".headline").textContent = sp.headline;
      overlay.querySelector(".text").textContent = sp.text;
      overlay.querySelector(".hq-link").textContent = sp.linkText;
    }
    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.parentNode.removeChild(overlay);
    }
    function onKey(e) {
      if (e.key === "Escape") {
        close();
      }
    }
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.tagName === "BUTTON" || (e.target.className || "").indexOf("advent-x") >= 0) {
        e.preventDefault();
        close();
      }
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    var focus = overlay.querySelector("button") || overlay.querySelector("a");
    if (focus) {
      focus.focus();
    }
  }

  var inDecember = month === 12;
  var today = inDecember && day >= 1 && day <= 25 ? day : 0;
  var after = inDecember && day > 25; // Christmas is over: every door is open

  // marks a door as opened and puts the icon of its item (or the label of a release announcement) on it
  function showOpened(li, link, n) {
    li.classList.remove("closed", "canopen");
    li.classList.add("opened");
    var it = itemOf(n);
    link.title = SPECIAL[n] ? it.name + " - " + SPECIAL[n].value : it.name;
    link.style.backgroundImage = 'url("' + ICONS + it.icon + '")';
  }

  var doors = calendar.querySelectorAll("li.window");
  Array.prototype.forEach.call(doors, function (li) {
    var link = li.querySelector("a");
    var n = parseInt(link.getAttribute("data-day"), 10);
    li.classList.remove("closed", "canopen", "opened");
    if (after || (today && n < today) || (n === today && opened[n])) {
      showOpened(li, link, n);
    } else if (n === today) {
      li.classList.add("canopen");
      link.title = "Open today's door!";
    } else {
      li.classList.add("closed");
      link.title = "This door opens on " + MONTHS[12] + " " + n;
    }
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (li.classList.contains("opened")) {
        showPresent(n, false);
      } else if (n === today) {
        opened[n] = true;
        save();
        showOpened(li, link, n);
        updateStatus();
        showPresent(n, true);
      }
    });
  });

  var status = document.getElementById("advent-status");
  function updateStatus() {
    if (!status) {
      return;
    }
    if (today) {
      status.textContent = opened[today]
        ? "Today's door (" + today + ") is open - come back tomorrow for the next one!"
        : "It's " + MONTHS[12] + " " + today + " - open door " + today + "!";
    } else if (after) {
      status.textContent = "Merry Christmas! The calendar is closed - see you next December.";
    } else {
      status.textContent = "The calendar opens on December 1 - come back then!";
    }
  }
  updateStatus();
})();
