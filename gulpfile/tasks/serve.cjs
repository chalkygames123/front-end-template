'use strict';

const { getServer } = require('@11ty/eleventy-dev-server');

const config = require('../../config.cjs');

const cert = process.env.SSL_CERTIFICATE;
const key = process.env.SSL_CERTIFICATE_KEY;

const serve = (callback) => {
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

	callback();
};

module.exports = serve;
