import webpack from 'webpack'

import config from '../../config'
import webpackConfig from '../../webpack.config'

const isDev = config.get('mode') !== 'production'
const compiler = webpack(webpackConfig)
const handler = cb => (err, stats) => {
  // eslint-disable-next-line no-console
  console.log(
    stats.toString({
      colors: true
    })
  )

  cb()
}

export default function scripts(cb) {
  if (isDev) {
    compiler.watch({}, handler(cb))
  } else {
    compiler.run(handler(cb))
  }
}
