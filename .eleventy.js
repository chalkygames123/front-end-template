const { join } = require('node:path');

const { lintHtml } = require('./11ty/linters');
const { formatHtml } = require('./11ty/transforms');
const config = require('./config');

module.exports = (eleventyConfig) => {
	eleventyConfig.addLinter('lint-html', lintHtml);

	eleventyConfig.addTransform('format-html', formatHtml);

	return {
		dir: {
			input: join(config.get('srcDir'), 'templates'),
			output: join(config.get('distDir'), config.get('publicPath')),
		},
		pathPrefix: config.get('publicPath'),
	};
};
