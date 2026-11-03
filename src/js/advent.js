/*
 * Bricktastic X-Mas Calendar (fan re-creation).
 * Door N can be opened on N December (1-25). Opening it shows a random festive item - nothing is stored
 * on a server and no login is needed; the doors you opened are remembered in this browser (localStorage).
 *
 * To try it outside of December, add ?date=12-07 (or ?date=2026-12-07) to the page address.
 */
(function () {
  "use strict";

  // Festive items of the old Brick-Force shop (from the original "Brickmas Items!" / "New Weapons" announcements)
  var ITEMS = [
    "Santa Costume",
    "Rudolph Jacket Costume",
    "Chimney Sweep Costume",
    "Snowball Menace",
    "Shooting Star",
    "Four-Leaf Clover",
    "Porky Hog",
    "Bazooka",
    "Candy Stick Christmas Bell",
    "Chimney Sweep Stick",
    "Grape Juice",
    "Christmas Bauble Grenade",
    "Lucky Pig Canteen",
    "Silver Beetle",
    "Silver Rattler",
    "Shiny Hornet Crossbow of Epicness",
    "Snow Hornet",
    "Moongun 2.0 Prototype",
  ];
  var MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var calendar = document.querySelector(".advent-calendar .windows");
  if (!calendar) {
    return;
  }

  // "today" - or the date from ?date=MM-DD / ?date=YYYY-MM-DD for testing
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var override = /[?&]date=(?:(\d{4})-)?(\d{1,2})-(\d{1,2})/.exec(window.location.search);
  if (override) {
    year = override[1] ? parseInt(override[1], 10) : year;
    month = parseInt(override[2], 10);
    day = parseInt(override[3], 10);
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

  function randomItem() {
    var used = {};
    for (var d in opened) {
      if (Object.prototype.hasOwnProperty.call(opened, d)) {
        used[opened[d]] = true;
      }
    }
    var pool = ITEMS.filter(function (item) {
      return !used[item];
    });
    if (!pool.length) {
      pool = ITEMS; // every item was handed out already - start over
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function showPresent(dayNumber, item, isNew) {
    var overlay = document.createElement("div");
    overlay.className = "advent-overlay";
    overlay.innerHTML =
      '<div class="advent-box" role="dialog" aria-modal="true">' +
      "<h3>Door " + dayNumber + "</h3>" +
      "<p>" + (isNew ? "Your present for today:" : "You already opened this door:") + "</p>" +
      '<p class="item"></p>' +
      '<p class="note">A fan re-creation of the original calendar &ndash; the item is not added to any inventory.</p>' +
      '<button type="button">Close</button>' +
      "</div>";
    overlay.querySelector(".item").textContent = item;
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
      if (e.target === overlay || e.target.tagName === "BUTTON") {
        close();
      }
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    overlay.querySelector("button").focus();
  }

  var inDecember = month === 12;
  var today = inDecember && day >= 1 && day <= 25 ? day : 0;

  var doors = calendar.querySelectorAll("li.window");
  Array.prototype.forEach.call(doors, function (li) {
    var link = li.querySelector("a");
    var n = parseInt(link.getAttribute("data-day"), 10);
    li.classList.remove("closed", "canopen", "opened");
    if (opened[n]) {
      li.classList.add("opened");
      link.title = "Opened: " + opened[n];
    } else if (n === today) {
      li.classList.add("canopen");
      link.title = "Open today's door!";
    } else {
      li.classList.add("closed");
      link.title = n < today || (inDecember && day > 25) ? "This door can no longer be opened" : "This door opens on " + MONTHS[12] + " " + n;
    }
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (opened[n]) {
        showPresent(n, opened[n], false);
      } else if (n === today) {
        opened[n] = randomItem();
        save();
        li.classList.remove("canopen");
        li.classList.add("opened");
        link.title = "Opened: " + opened[n];
        updateStatus();
        showPresent(n, opened[n], true);
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
    } else if (inDecember && day > 25) {
      status.textContent = "Merry Christmas! The calendar is closed - see you next December.";
    } else {
      status.textContent = "The calendar opens on December 1 - come back then!";
    }
  }
  updateStatus();
})();
