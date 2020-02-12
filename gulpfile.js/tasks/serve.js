const config = require('../../config')
const common = require('../common')

module.exports = function serve(cb) {
  common.server.init(
    {
      ui: false,
      watch: true,
      server: config.get('distDir'),
      https:
        process.env.SSL_CERTIFICATE !== undefined &&
        process.env.SSL_CERTIFICATE_KEY !== undefined
          ? {
              key: process.env.SSL_CERTIFICATE_KEY,
              cert: process.env.SSL_CERTIFICATE
            }
          : false,
      ghostMode: false,
      online: false,
      open: false,
      notify: false,
      startPath: config.get('publicPath')
    },
    cb
  )
}
