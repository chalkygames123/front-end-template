'use strict';

const { readFileSync } = require('node:fs');
const { Transform } = require('node:stream');

const nodeIgnore = require('ignore');

const ig = nodeIgnore().add(readFileSync('.gitignore', 'utf8'));

const ignore = () =>
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

module.exports = ignore;
