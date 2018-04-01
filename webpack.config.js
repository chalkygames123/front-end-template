const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const gulpConfig = require('./gulp/config')

const commonPlugins = []

const developmentPlugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: 'maps/[file].map',
    exclude: [gulpConfig.paths.root ? '/' : '' + 'assets/scripts/vendor']
  }),
  new WebpackBuildNotifierPlugin({
    suppressSuccess: 'always',
    messageFormatter: (error, filepath) => {
      if (error) {}
      return require('path').relative(__dirname, filepath)
    }
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
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      gulpConfig.paths.src + gulpConfig.paths.root + '/assets/scripts'
    ]
  },
  plugins: commonPlugins.concat(gulpConfig.env.PRODUCTION ? productionPlugins : developmentPlugins),
  watch: gulpConfig.program.watch
}

module.exports = config
