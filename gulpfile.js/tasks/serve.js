const path = require('path')

const config = require('../../config')
const common = require('../common')

module.exports = function serve(cb) {
  common.server.init(
    {
      ui: false,
      watch: true,
      server: config.get('distDir'),
      https: config.get('https') && {
        key: 'localhost-key.pem',
        cert: 'localhost.pem'
      },
      ghostMode: false,
      online: false,
      open: false,
      notify: false,
      startPath: path.join(config.get('site.basePath'), config.get('index'))
    },
    cb
  )
}
