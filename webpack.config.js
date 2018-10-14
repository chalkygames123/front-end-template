const path = require('path')

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

module.exports = {
  mode: config.env,
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: path.join(config.dir.assets, 'scripts/vendor'),
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
      path.join(config.srcDir, config.dir.assets, 'scripts')
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
