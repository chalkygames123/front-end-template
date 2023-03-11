import { Transform } from 'node:stream';

export const pipeIf = (condition, stream) => {
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
