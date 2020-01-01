const browserSync = require('browser-sync')
const webpack = require('webpack')

const webpackConfig = require('../webpack.config')

const common = {
  server: browserSync.create(),
  webpackCompiler: webpack(webpackConfig)
}

module.exports = common
