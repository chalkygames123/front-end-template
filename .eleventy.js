/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const path = require('path');

const { htmlhint } = require('./11ty/linters');
const { minifyHtml } = require('./11ty/transforms');
const config = require('./config');

module.exports = (eleventyConfig) => {
	eleventyConfig.addLinter('htmlhint', htmlhint);

	eleventyConfig.addTransform('minify-html', minifyHtml);

	return {
		dir: {
			input: path.join(config.get('srcDir'), 'templates'),
			output: path.join(config.get('distDir'), config.get('publicPath')),
		},
		pathPrefix: config.get('publicPath'),
	};
};
