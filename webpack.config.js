const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const config = require('./gulp/config')

const commonPlugins = []

const developmentPlugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: 'maps/[name].js.map',
    exclude: [config.paths.root ? '/' : '' + 'assets/scripts/vendor']
  }),
  new WebpackBuildNotifierPlugin({
    suppressSuccess: 'always',
    messageFormatter: (error, filepath) => {
      if (error) {}
      return require('path').relative(__dirname, filepath)
    }
  })
]

const productionPlugins = []

module.exports = {
  mode: process.env.NODE_ENV,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: config.paths.root ? '/' : '' + 'assets/scripts/vendor'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'standard-loader'
          }
        ],
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      config.paths.src + config.paths.root + '/assets/scripts'
    ]
  },
  plugins: commonPlugins.concat(config.env.PRODUCTION ? productionPlugins : developmentPlugins),
  watch: config.program.watch
}
