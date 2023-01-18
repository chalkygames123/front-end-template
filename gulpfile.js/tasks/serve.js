const { getServer } = require('@11ty/eleventy-dev-server');

const config = require('../../config');

const cert = process.env.SSL_CERTIFICATE;
const key = process.env.SSL_CERTIFICATE_KEY;

module.exports = function serve(cb) {
	const server = getServer('server', config.get('distDir'), {
		https:
			cert && key
				? {
						cert,
						key,
				  }
				: false,
		watch: [config.get('distDir')],
	});

	server.serve(server.options.port);

	cb();
};
