import upath from 'upath'

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'

import common from './gulpfile.js/common'
import config from './config'

const isDev = common.env === 'development'

export default {
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
            loader: 'eslint-loader'
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
