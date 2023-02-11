module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: '*.html',
			options: {
				printWidth: Number.POSITIVE_INFINITY,
			},
		},
	],
};
