const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const PRODUCTION = process.env.NODE_ENV === 'production'

const commonPlugins = [
	new webpack.optimize.CommonsChunkPlugin({
		name: 'assets/scripts/vendor',
		minChunks: module => /node_modules/.test(module.context),
	}),
]

const developmentPlugins = [
	new webpack.SourceMapDevToolPlugin({
		filename: 'maps/[name].js.map',
		exclude: ['assets/scripts/vendor'],
	}),
	new WebpackBuildNotifierPlugin({
		suppressSuccess: 'always',
		messageFormatter: (error, filepath) => {
			return require('path').relative(__dirname, filepath)
		},
	}),
]

const productionPlugins = [
	new webpack.optimize.ModuleConcatenationPlugin(),
	new webpack.optimize.UglifyJsPlugin(),
	new webpack.optimize.AggressiveMergingPlugin(),
]

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'eslint-loader',
						options: {
							emitWarning: true,
						},
					},
				],
				exclude: `${__dirname}/node_modules`,
			},
		],
	},
	resolve: {
		modules: [
			'src/assets/scripts',
			'node_modules',
		],
	},
	plugins: commonPlugins.concat(PRODUCTION ? productionPlugins : developmentPlugins),
}
