'use strict';

const { extname } = require('node:path');

const { minify } = require('html-minifier');

const config = require('../../config.cjs');

const isDevelopment = config.get('mode') !== 'production';

const minifyHtml = function (content) {
	if (
		!this.page.outputPath ||
		!['.html', '.php'].includes(extname(this.page.outputPath)) ||
		isDevelopment
	) {
		return content;
	}

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

module.exports = minifyHtml;
