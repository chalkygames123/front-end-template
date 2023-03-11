import { readFileSync } from 'node:fs';
import { dirname, extname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import ESLintPlugin from 'eslint-webpack-plugin';
import { fdir as Fdir } from 'fdir';
import ignore from 'ignore';
import webpack from 'webpack';

import config from './config.cjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = config.get('mode') !== 'production';
const ig = ignore().add(readFileSync('.gitignore', 'utf8'));
const crawler = new Fdir()
	.withBasePath()
	.filter((filePath) => !ig.ignores(filePath) && extname(filePath) === '.js')
	.crawl(posix.join(config.get('srcDir'), 'assets/scripts'));

/**
 * @type { import('webpack').Configuration }
 */
export default {
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
	devtool: isDevelopment ? 'eval-source-map' : false,
	context: __dirname,
	plugins: [
		new ESLintPlugin({
			files: [
				join(config.get('srcDir'), 'assets/scripts'),
				join(config.get('srcDir'), 'modules'),
			],
		}),
		new webpack.DefinePlugin({
			'import.meta.env.MODE': JSON.stringify(config.get('mode')),
			'import.meta.env.PUBLIC_PATH': JSON.stringify(config.get('publicPath')),
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
					test: /[/\\]node_modules[/\\]/i,
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
