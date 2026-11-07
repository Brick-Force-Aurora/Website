// Comic viewer: episode carousel, page 1/2 viewer, previous / next across episodes
(function () {
  var EPISODES = 12;
  var STEP = 173;
  var VISIBLE = 4;
  var viewer = document.querySelector('.episode-viewer');
  if (!viewer) return;
  var list = document.querySelector('.jcarousel-list');
  var links = document.querySelectorAll('.jcarousel-item a');
  var prev = viewer.querySelector('.prev');
  var next = viewer.querySelector('.next');
  var cprev = document.querySelector('.jcarousel-prev');
  var cnext = document.querySelector('.jcarousel-next');
  var episode = 1;
  var second = false;
  var first = 1;

  function fromHash() {
    var m = /^#episode-(\d+)(?:-(2))?$/.exec(location.hash);
    if (m && +m[1] >= 1 && +m[1] <= EPISODES) {
      episode = +m[1];
      second = !!m[2];
    }
  }

  function scrollTo(f) {
    first = Math.max(1, Math.min(EPISODES - VISIBLE, f));
    list.style.left = -(first - 1) * STEP + 'px';
    cprev.classList.toggle('jcarousel-prev-disabled', first <= 1);
    cprev.classList.toggle('jcarousel-prev-disabled-horizontal', first <= 1);
    cnext.classList.toggle('jcarousel-next-disabled', first >= EPISODES - VISIBLE);
    cnext.classList.toggle('jcarousel-next-disabled-horizontal', first >= EPISODES - VISIBLE);
  }

  function render() {
    var pages = document.querySelectorAll('.episode-pages');
    for (var i = 0; i < pages.length; i++) pages[i].hidden = +pages[i].getAttribute('data-episode') !== episode;
    for (var j = 0; j < links.length; j++) links[j].classList.toggle('selected', j + 1 === episode);
    viewer.classList.toggle('show-second', second);
    prev.classList.toggle('disable', episode === 1 && !second);
    next.classList.toggle('disable', episode === EPISODES && second);
    if (episode < first) scrollTo(episode);
    else if (episode > first + VISIBLE - 1) scrollTo(episode - VISIBLE + 1);
    try {
      history.replaceState(null, '', '#episode-' + episode + (second ? '-2' : ''));
    } catch (e) {}
  }

  prev.addEventListener('click', function (e) {
    e.preventDefault();
    if (second) second = false;
    else if (episode > 1) { episode--; second = true; }
    render();
  });
  next.addEventListener('click', function (e) {
    e.preventDefault();
    if (!second) second = true;
    else if (episode < EPISODES) { episode++; second = false; }
    render();
  });
  for (var k = 0; k < links.length; k++) {
    links[k].addEventListener('click', (function (n) {
      return function (e) {
        e.preventDefault();
        episode = n;
        second = false;
        render();
      };
    })(k + 1));
  }
  cprev.addEventListener('click', function () { scrollTo(first - 1); });
  cnext.addEventListener('click', function () { scrollTo(first + 1); });

  fromHash();
  scrollTo(Math.min(episode, EPISODES - VISIBLE + 1));
  render();
})();
