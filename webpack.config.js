const { readFileSync } = require('node:fs');
const { extname, join, posix, relative } = require('node:path');

const ESLintPlugin = require('eslint-webpack-plugin');
const { fdir: Fdir } = require('fdir');
const ignore = require('ignore');

const config = require('./config');

const isDev = config.get('mode') !== 'production';
const ig = ignore().add(readFileSync('.gitignore', 'utf8'));
const crawler = new Fdir()
	.withBasePath()
	.filter((filePath) => !ig.ignores(filePath) && extname(filePath) === '.js')
	.crawl(posix.join(config.get('srcDir'), 'assets/scripts'));

/**
 * @type import('webpack').Configuration
 */
module.exports = {
	mode: config.get('mode'),
	async entry() {
		const filePaths = await crawler.withPromise();

		return Object.fromEntries(
			filePaths.map((filePath) => {
				const chunkName = relative(
					join(config.get('srcDir'), 'assets/scripts'),
					filePath,
				).replace(extname(filePath), '');
				const entryPoint = `./${filePath}`;

				return [chunkName, entryPoint];
			}),
		);
	},
	output: {
		path: join(
			__dirname,
			config.get('distDir'),
			config.get('publicPath'),
			'assets/scripts',
		),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					join(__dirname, config.get('srcDir'), 'assets/scripts'),
					join(__dirname, config.get('srcDir'), 'modules'),
				],
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'~': __dirname,
		},
	},
	devtool: isDev ? 'eval-source-map' : false,
	context: __dirname,
	plugins: [
		new ESLintPlugin({
			files: [
				join(config.get('srcDir'), 'assets/scripts'),
				join(config.get('srcDir'), 'modules'),
			],
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				default: false,
				defaultVendors: false,
				vendors: {
					minSize: 0,
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/i,
				},
				commons: {
					minChunks: 2,
					minSize: 0,
					name: 'commons',
				},
			},
		},
	},
};
