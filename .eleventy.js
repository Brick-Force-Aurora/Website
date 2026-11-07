module.exports = function (eleventyConfig) {
    // Copy `css` and `js` folders to the output directory
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    // Copy `resources/images` to the output directory
    eleventyConfig.addPassthroughCopy("src/images");
    // News archive grouped by year (data: src/_data/archivePosts.json)
    eleventyConfig.addGlobalData("archiveNews", require("./lib/archive-news.js"));

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