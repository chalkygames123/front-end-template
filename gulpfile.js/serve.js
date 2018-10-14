const path = require('path')

const config = require(path.resolve('config'))

function serve (cb) {
  config.server.init({
    ui: false,
    server: config.distDir,
    startPath: config.baseDir
  })

  cb()
}

module.exports = serve
