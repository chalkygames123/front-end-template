const config = require('./gulp/config')

const WebpackNotifierPlugin = require('webpack-notifier')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

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
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
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
  plugins: [
    config.env.DEVELOPMENT && new WebpackNotifierPlugin({
      skipFirstNotification: true
    }),
    config.env.PRODUCTION && new MinifyPlugin(),
    config.env.PRODUCTION && new LodashModuleReplacementPlugin({
      'collections': true
    })
  ].filter(Boolean)
}
