const { readFileSync } = require('node:fs');
const { Transform } = require('node:stream');

const ignore = require('ignore');

const ig = ignore().add(readFileSync('.gitignore', 'utf8'));

module.exports = () =>
	new Transform({
		objectMode: true,
		transform(file, encoding, cb) {
			if (ig.ignores(file.relative)) {
				cb();
			} else {
				cb(null, file);
			}
		},
	});
