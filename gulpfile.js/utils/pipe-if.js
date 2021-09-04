const { Transform } = require('stream');

module.exports = (condition, stream) => {
	if (condition) {
		return stream;
	}

	return new Transform({
		objectMode: true,
		transform(file, encoding, cb) {
			cb(null, file);
		},
	});
};
