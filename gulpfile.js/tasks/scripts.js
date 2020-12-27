const webpack = require('webpack')

const config = require('../../config')
const webpackConfig = require('../../webpack.config')

const compiler = webpack(webpackConfig)

function scripts(cb) {
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
    compiler.watch({}, handler)
  } else {
    compiler.run(handler)
  }
}

module.exports = scripts
