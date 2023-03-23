'use strict';

/**
 * @type { import('prettier').Config }
 */
module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	keepOverrides: false,
	overrides: [
		{
			files: '*.html',
			options: {
				printWidth: Number.POSITIVE_INFINITY,
			},
		},
	],
};
