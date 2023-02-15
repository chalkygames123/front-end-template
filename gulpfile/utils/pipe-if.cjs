'use strict';

const { Transform } = require('node:stream');

const pipeIf = (condition, stream) => {
	if (condition) {
		return stream;
	}

	return new Transform({
		objectMode: true,
		transform(file, encoding, callback) {
			callback(undefined, file);
		},
	});
};

module.exports = pipeIf;
