const { readFileSync } = require('node:fs');
const { Transform } = require('node:stream');

const nodeIgnore = require('ignore');

const ig = nodeIgnore().add(readFileSync('.gitignore', 'utf8'));

module.exports = function ignore() {
	return new Transform({
		objectMode: true,
		transform(file, encoding, cb) {
			if (ig.ignores(file.relative)) {
				cb();
			} else {
				cb(null, file);
			}
		},
	});
};
