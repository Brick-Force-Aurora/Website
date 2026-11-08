module.exports = function (eleventyConfig) {
    // Copy `css` and `js` folders to the output directory
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    // Copy `resources/images` to the output directory
    eleventyConfig.addPassthroughCopy("src/images");
    // News archive grouped by year (data: src/_data/archivePosts.json)
    eleventyConfig.addGlobalData("archiveNews", require("./lib/archive-news.js"));

    // Search tab of the news archive: write the plain-text index next to the pages after every build
    eleventyConfig.on("eleventy.after", ({ dir }) => {
        const fs = require("fs");
        const path = require("path");
        const out = path.join(dir.output, "archive", "news");
        fs.mkdirSync(out, { recursive: true });
        fs.writeFileSync(path.join(out, "search-index.json"), JSON.stringify(require("./lib/archive-news.js")().index));
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