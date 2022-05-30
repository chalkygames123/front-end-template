const config = require('../../config');
const { server } = require('../common');

const cert = process.env.SSL_CERTIFICATE;
const key = process.env.SSL_CERTIFICATE_KEY;

module.exports = function serve(cb) {
	server.init(
		{
			ghostMode: false,
			https:
				cert && key
					? {
							cert,
							key,
					  }
					: false,
			notify: false,
			open: false,
			server: config.get('distDir'),
			startPath: config.get('publicPath'),
			ui: false,
			watch: true,
		},
		cb,
	);
};
