module.exports = function (eleventyConfig) {
    // Copy `css` and `js` folders to the output directory
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    // Copy `resources/images` to the output directory
    eleventyConfig.addPassthroughCopy("src/images");
    // News archive grouped by year (data: src/_data/archivePosts.json)
    eleventyConfig.addGlobalData("archiveNews", require("./lib/archive-news.js"));
    // Archived forum (data: src/forum-data/*.json, see lib/forum.js)
    eleventyConfig.addGlobalData("forum", require("./lib/forum.js"));

    // Search tab of the news archive: write the plain-text index next to the pages after every build
    eleventyConfig.on("eleventy.after", ({ dir }) => {
        const fs = require("fs");
        const path = require("path");
        const out = path.join(dir.output, "archive", "news");
        fs.mkdirSync(out, { recursive: true });
        fs.writeFileSync(path.join(out, "search-index.json"), JSON.stringify(require("./lib/archive-news.js")().index));
    });

    // Search tab of the forum archive: titles, authors and opening texts of all archived threads.
    // The output folder is taken from the written forum index page, so it also works with --output=<dir>.
    eleventyConfig.on("eleventy.after", ({ dir, results }) => {
        const fs = require("fs");
        const path = require("path");
        const home = (results || []).find((r) => r.url === "/forum/");
        const out = home ? path.dirname(home.outputPath) : path.join(dir.output, "forum");
        fs.mkdirSync(out, { recursive: true });
        fs.writeFileSync(path.join(out, "search-index.json"), JSON.stringify(require("./lib/forum.js").searchIndex()));
    });

    // Downloads (Fansite Kit, logos)
    eleventyConfig.addPassthroughCopy("src/downloads");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        },
        pathPrefix: "/Website/"
    };
};