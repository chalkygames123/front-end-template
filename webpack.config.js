const path = require('path')

const upath = require('upath')

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const common = require(path.resolve('gulpfile.js/common'))
const config = require(path.resolve('config'))

const isDev = common.env === 'development'

module.exports = {
  mode: common.env,
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          minSize: 0,
          name: upath.join(config.dir.assets, config.dir.scripts, 'vendors')
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
      upath.join(config.srcDir, config.dir.assets, config.dir.scripts),
      'node_modules'
    ]
  },
  devtool: isDev ? 'eval-source-map' : false,
  plugins: [
    isDev && new WebpackNotifierPlugin({
      skipFirstNotification: true
    }),
    !isDev && new LodashModuleReplacementPlugin({
      collections: true
    }),
    !isDev && new MinifyPlugin()
  ].filter(Boolean)
}
