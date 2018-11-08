const path = require('path')

const common = require(path.resolve('gulpfile.js/common'))
const config = require(path.resolve('config'))

function serve (cb) {
  common.server.init({
    ui: false,
    server: config.distDir,
    startPath: config.basePath
  })

  cb()
}

module.exports = serve
