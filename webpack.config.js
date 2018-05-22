const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const gulpConfig = require('./gulp/config')

const commonPlugins = []

const developmentPlugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: 'maps/[file].map',
    exclude: [gulpConfig.paths.root ? '/' : '' + 'assets/scripts/vendor']
  }),
  new WebpackNotifierPlugin({
    skipFirstNotification: true
  })
]

const productionPlugins = [
  new MinifyPlugin()
]

const config = {
  mode: process.env.NODE_ENV,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 0,
          test: /[\\/]node_modules[\\/]/,
          name: gulpConfig.paths.root ? '/' : '' + 'assets/scripts/vendor',
          chunks: 'all'
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
            loader: 'babel-loader?cacheDirectory'
          },
          {
            loader: 'standard-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      gulpConfig.paths.src + gulpConfig.paths.root + '/assets/scripts'
    ]
  },
  plugins: commonPlugins.concat(gulpConfig.env.DEVELOPMENT ? developmentPlugins : [], gulpConfig.env.PRODUCTION ? productionPlugins : []),
  watch: gulpConfig.watch
}

module.exports = config
