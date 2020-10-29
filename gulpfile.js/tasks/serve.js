const config = require('../../config')
const common = require('../common')

module.exports = function serve(cb) {
  common.server.init(
    {
      ghostMode: false,
      https:
        process.env.SSL_CERTIFICATE !== undefined &&
        process.env.SSL_CERTIFICATE_KEY !== undefined
          ? {
              cert: process.env.SSL_CERTIFICATE,
              key: process.env.SSL_CERTIFICATE_KEY,
            }
          : false,
      notify: false,
      open: false,
      server: config.get('distDir'),
      startPath: config.get('publicPath'),
      ui: false,
      watch: true,
    },
    cb
  )
}
