import { readFile } from 'node:fs/promises';

const packageConfig = JSON.parse(await readFile('package.json'));

export default {
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
