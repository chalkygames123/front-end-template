const packageConfig = require('./package.json')

module.exports = (api) => {
	api.cache.forever()

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: packageConfig.dependencies['core-js'],
				},
			],
		],
	}
}
