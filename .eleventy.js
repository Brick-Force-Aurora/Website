module.exports = function (eleventyConfig) {
    // Copy `css` and `js` folders to the output directory
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    // Copy `resources/images` to the output directory
    eleventyConfig.addPassthroughCopy("src/images");
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