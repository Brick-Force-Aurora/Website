// Playerlist / maplist: search by nickname (or map name and builder) and sort by clicking a column header
(function () {
  var table = document.getElementById('playerlist') || document.getElementById('maplist');
  if (!table) return;
  var input = document.getElementById('player-search');
  var count = document.getElementById('player-count');
  var noun = table.getAttribute('data-noun') || 'players';
  var cols = (table.getAttribute('data-search-cols') || '1').split(',').map(Number);
  var body = table.tBodies[0];
  var rows = Array.prototype.slice.call(body.rows);

  // banded rows follow the visible order, not the original position
  function band() {
    var n = 0;
    rows.forEach(function (r) {
      if (r.style.display === 'none') return;
      n++;
      r.className = (n % 2 ? 'odd' : 'even') + ' places';
    });
  }

  function update() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    rows.forEach(function (r) {
      var hit = !q || cols.some(function (c) { return r.cells[c].textContent.toLowerCase().indexOf(q) !== -1; });
      r.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    band();
    count.textContent = q ? shown + ' of ' + rows.length + ' ' + noun : rows.length + ' ' + noun;
  }

  function value(row, i) {
    var cell = row.cells[i];
    var v = cell.getAttribute('data-sort') || cell.textContent;
    var n = parseFloat(v.replace(/[#,\s]/g, '').replace(/\(.*\)/, ''));
    return isNaN(n) ? v.toLowerCase() : n;
  }

  Array.prototype.forEach.call(table.tHead.rows[0].cells, function (th, i) {
    th.style.cursor = 'pointer';
    th.title = 'Sort';
    th.addEventListener('click', function () {
      var dir = th.getAttribute('data-dir') === 'asc' ? -1 : 1;
      Array.prototype.forEach.call(th.parentNode.cells, function (c) { c.removeAttribute('data-dir'); });
      th.setAttribute('data-dir', dir === 1 ? 'asc' : 'desc');
      rows.sort(function (a, b) {
        var x = value(a, i), y = value(b, i);
        return (x > y ? 1 : x < y ? -1 : 0) * dir;
      });
      rows.forEach(function (r) { body.appendChild(r); });
      band();
    });
  });

  input.addEventListener('input', update);
  update();
})();
