const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('../../config')
const webpackConfig = require('../../webpack.config')

const compiler = webpack(webpackConfig)

function scripts(cb) {
  if (config.get('watch')) {
    const server = new WebpackDevServer(compiler, webpackConfig.devServer)

    server.listen(3000, '127.0.0.1', cb)
  } else {
    compiler.run((error, stats) => {
      // eslint-disable-next-line no-console
      console.log(
        stats.toString({
          colors: true,
        })
      )

      cb()
    })
  }
}

module.exports = scripts
