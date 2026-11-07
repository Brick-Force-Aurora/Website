// News archive (global data "archiveNews", see .eleventy.js): reads src/_data/archivePosts.json and groups the posts by year (newest first).
// - links to other archived posts point to the year page that contains them
// - a teaser image is only shown if its file exists in images/archive/news (drop new teaser images there)
const fs = require("fs");
const path = require("path");

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
  return { years, total: posts.length, latest: years[0].year, first: years[years.length - 1].year };
};
