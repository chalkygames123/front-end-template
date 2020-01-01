const config = require('../../config')
const common = require('../common')

const isDev = config.get('mode') !== 'production'
const handler = cb => (err, stats) => {
  // eslint-disable-next-line no-console
  console.log(
    stats.toString({
      colors: true
    })
  )

  cb()
}

module.exports = function scripts(cb) {
  if (isDev) {
    common.webpackCompiler.watch({}, handler(cb))
  } else {
    common.webpackCompiler.run(handler(cb))
  }
}
