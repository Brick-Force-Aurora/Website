module.exports = function (eleventyConfig) {
    // Copy `css` and `js` folders to the output directory
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    // Copy `resources/images` to the output directory
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        }
    };
};