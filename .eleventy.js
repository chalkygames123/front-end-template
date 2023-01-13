const { join } = require('node:path');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

const { lintHtml } = require('./11ty/linters');
const { minifyHtml } = require('./11ty/transforms');
const config = require('./config');

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	eleventyConfig.addLinter('lint-html', lintHtml);

	eleventyConfig.addTransform('minify-html', minifyHtml);

	return {
		dir: {
			input: join(config.get('srcDir'), 'templates'),
			output: join(config.get('distDir'), config.get('publicPath')),
		},
		pathPrefix: config.get('publicPath'),
	};
};
