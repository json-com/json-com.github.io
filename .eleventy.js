const sass = require('sass');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const eleventyMermaidPlugin = require('@kevingimbel/eleventy-plugin-mermaid');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const blogTools = require('eleventy-plugin-blog-tools');

const mermaidShortcode = require('./_shortcodes/mermaid');
const mermaidFullscreenJsShortcode = require('./_shortcodes/mermaid_fullscreen_js');

module.exports = function(eleventyConfig) {
  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addPlugin(blogTools);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyMermaidPlugin, { extra_classes: 'attached' });
  // add custom JS for loading SVG pan/zoom features
  eleventyConfig.addShortcode('mermaid_with_callback_js', mermaidFullscreenJsShortcode);
  // add fullscreen-able mermaid display
  eleventyConfig.addPairedShortcode('mermaid', mermaidShortcode);

  eleventyConfig.addTemplateFormats('scss');
  // Creates the extension for use
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css', // optional, default: 'html'

    // `compile` is called once per .scss file in the input directory
    compile: async function(inputContent) {
      let result = sass.compileString(inputContent, { loadPaths: ['_sass/'] });

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    }
  });

  eleventyConfig.addPassthroughCopy('public/');
//  eleventyConfig.addPassthroughCopy('**/*.jpg');
//  eleventyConfig.addPassthroughCopy('**/*.png');

  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('_posts/*.md');
  });

  // Return your Object options:
  return {
    dir: {
      layouts: '_layouts'
    }
  }
};