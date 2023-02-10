const { join } = require('node:path');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

const { lintHtml } = require('./11ty/linters');
const { minifyHtml, setImageDimensions } = require('./11ty/transforms');
const config = require('./config');

module.exports = (eleventyConfig) => {
	eleventyConfig.addLinter('lint-html', lintHtml);

	eleventyConfig.addTransform('set-image-dimensions', setImageDimensions);
	eleventyConfig.addTransform('minify-html', minifyHtml);

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		extensions: 'html,php',
	});

	return {
		dir: {
			input: join(config.get('srcDir'), 'templates'),
			output: join(config.get('distDir'), config.get('publicPath')),
		},
		pathPrefix: config.get('publicPath'),
	};
};
