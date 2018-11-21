const common = require('./common')
const config = require('../config')

function serve (cb) {
  common.server.init({
    ui: false,
    server: config.distDir,
    startPath: config.basePath
  })

  cb()
}

module.exports = serve
