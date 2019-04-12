import path from 'path'

import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'

import common from './common'
import config from './config'

const isDev = config.get('env') === 'development'

export default {
  mode: config.get('env'),
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          minSize: 0,
          name: `${common.dir.assets}/${common.dir.scripts}/vendors`
        }
      }
    }
  },
  module: {
    rules: [
      {
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true
            }
          }
        ],
        exclude: /[\\/]node_modules[\\/]/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(
        __dirname,
        config.get('srcDir'),
        common.dir.assets,
        common.dir.scripts
      ),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  devtool: isDev ? 'eval-source-map' : false,
  plugins: [
    isDev &&
      new WebpackNotifierPlugin({
        skipFirstNotification: true
      }),
    !isDev &&
      new LodashModuleReplacementPlugin({
        shorthands: true,
        collections: true
      }),
    !isDev && new MinifyPlugin()
  ].filter(Boolean)
}
