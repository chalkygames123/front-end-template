import EleventyDevServer from '@11ty/eleventy-dev-server';

import config from '../../config.cjs';

const { getServer } = EleventyDevServer;

const cert = process.env.SSL_CERTIFICATE;
const key = process.env.SSL_CERTIFICATE_KEY;

export const serve = (callback) => {
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
