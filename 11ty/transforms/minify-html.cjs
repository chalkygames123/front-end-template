const { extname } = require('node:path');

const { minify } = require('html-minifier');

const config = require('../../config.cjs');

const isDev = config.get('mode') !== 'production';

module.exports = function minifyHtml(content) {
	if (!['.html', '.php'].includes(extname(this.page.outputPath)) || isDev)
		return content;

	const result = minify(content, {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		decodeEntities: true,
		minifyCSS: true,
		minifyJS: true,
		processConditionalComments: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		trimCustomFragments: true,
		useShortDoctype: true,
	});

	return result;
};
