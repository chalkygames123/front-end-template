import { readFileSync } from 'node:fs';
import { Transform } from 'node:stream';

import nodeIgnore from 'ignore';

const ig = nodeIgnore().add(readFileSync('.gitignore', 'utf8'));

export const ignore = () =>
	new Transform({
		objectMode: true,
		transform(file, encoding, callback) {
			if (ig.ignores(file.relative)) {
				callback();
			} else {
				callback(undefined, file);
			}
		},
	});
