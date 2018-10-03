const path = require('path')

const config = require(require('path').resolve('config'))

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  mode: config.env,
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 0,
          test: /[\\/]node_modules[\\/]/,
          name: path.join(config.assetsDir, 'scripts/vendor'),
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
      path.join(config.srcDir, config.assetsDir, 'scripts')
    ]
  },
  devtool: config.isDev ? 'eval-source-map' : false,
  plugins: [
    config.isDev && new WebpackNotifierPlugin({
      skipFirstNotification: true
    }),
    !config.isDev && new LodashModuleReplacementPlugin({
      collections: true
    }),
    !config.isDev && new MinifyPlugin()
  ].filter(Boolean)
}
