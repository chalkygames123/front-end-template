import { rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import config from '../../config.cjs';

export const clean = (callback) => {
	if (
		dirname(process.cwd()).startsWith(dirname(resolve(config.get('distDir'))))
	) {
		callback(
			new Error("'distDir' cannot be outside of or same as process.cwd()"),
		);
	}

	return rm(config.get('distDir'), {
		force: true,
		recursive: true,
	});
};
