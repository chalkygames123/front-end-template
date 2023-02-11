const packageConfig = require('./package.json');

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: packageConfig.dependencies['core-js'],
			},
		],
	],
};
