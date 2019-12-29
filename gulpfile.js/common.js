import browserSync from 'browser-sync'
import webpack from 'webpack'

import webpackConfig from '../webpack.config'

const common = {
  server: browserSync.create(),
  webpackCompiler: webpack(webpackConfig)
}

export default common
