// News archive (global data "archiveNews", see .eleventy.js): reads src/_data/archivePosts.json and groups the posts by year (newest first).
// - links to other archived posts point to the year page that contains them
// - a teaser image is only shown if its file exists in images/archive/news (drop new teaser images there)
const fs = require("fs");
const path = require("path");

const ENTITIES = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—", hellip: "…", euro: "€", copy: "©", reg: "®", trade: "™", auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç" };

function plainText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
      if (e[0] === "#") {
        const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return code ? String.fromCodePoint(code) : " ";
      }
      return Object.prototype.hasOwnProperty.call(ENTITIES, e) ? ENTITIES[e] : " ";
    })
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = function () {
  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "_data", "archivePosts.json"), "utf8"));
  const imageDir = path.join(__dirname, "..", "src", "images", "archive", "news");
  const yearOf = {};
  posts.forEach((p) => {
    yearOf[p.id] = p.date.slice(0, 4);
  });

  const byYear = new Map();
  posts.forEach((p) => {
    const year = p.date.slice(0, 4);
    const html = p.html.replace(/href="\/Website\/archive\/news\/#post-(\d+)"/g, (m, id) =>
      yearOf[id] ? `href="/Website/archive/news/${yearOf[id]}/#post-${id}"` : m
    );
    const teaser = p.teaser && fs.existsSync(path.join(imageDir, p.teaser)) ? p.teaser : "";
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push({ ...p, html, teaser });
  });

  const years = [...byYear.keys()]
    .sort()
    .reverse()
    .map((year) => ({ year, count: byYear.get(year).length, posts: byYear.get(year) }));
  // search: plain text of every post (title, subtitle and body) for the Search tab (see src/archive-search-index.11ty.js)
  const index = posts.map((p) => ({
    i: p.id,
    y: p.date.slice(0, 4),
    t: p.title,
    s: p.subtitle || "",
    d: p.date,
    l: p.dateLabel,
    c: p.category,
    k: p.categoryLabel || p.category,
    x: plainText(p.html),
  }));
  const counts = {};
  posts.forEach((p) => {
    counts[p.category] = counts[p.category] || { key: p.category, label: p.categoryLabel || p.category, count: 0 };
    counts[p.category].count++;
  });
  const categories = Object.values(counts).sort((a, b) => a.label.localeCompare(b.label));
  const dates = posts.map((p) => p.date).sort();

  return {
    years,
    total: posts.length,
    latest: years[0].year,
    first: years[years.length - 1].year,
    index,
    categories,
    dateMin: dates[0],
    dateMax: dates[dates.length - 1],
  };
};
