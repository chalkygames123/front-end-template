const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const config = require('./gulp/config')

const commonPlugins = []

const developmentPlugins = [
  new WebpackNotifierPlugin({
    skipFirstNotification: true
  })
]

const productionPlugins = [
  new MinifyPlugin()
]

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 0,
          test: /[\\/]node_modules[\\/]/,
          name: `${config.paths.root.substring(1)}assets/scripts/vendor`,
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
      `${config.paths.src}${config.paths.root}assets/scripts`
    ]
  },
  devtool: config.env.DEVELOPMENT ? 'eval-source-map' : false,
  plugins: commonPlugins.concat(
    config.env.DEVELOPMENT ? developmentPlugins : [],
    config.env.PRODUCTION ? productionPlugins : []
  )
}
