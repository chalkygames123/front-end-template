const webpack = require('webpack')

const config = require('../../config')
const webpackConfig = require('../../webpack.config')

function scripts(cb) {
  const webpackCompiler = webpack(webpackConfig)
  const handler = (err, stats) => {
    // eslint-disable-next-line no-console
    console.log(
      stats.toString({
        colors: true,
      })
    )

    cb()
  }

  if (config.get('watch')) {
    webpackCompiler.watch({}, handler)
  } else {
    webpackCompiler.run(handler)
  }
}

module.exports = scripts
