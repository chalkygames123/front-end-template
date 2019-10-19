import upath from 'upath'

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
          chunks: 'all',
          name: upath.join(common.dir.assets, common.dir.scripts, 'vendors'),
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: {
      name: upath.join(common.dir.assets, common.dir.scripts, 'runtime')
    },
    noEmitOnErrors: false
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
      upath.resolve(
        __dirname,
        config.get('srcDir'),
        common.dir.assets,
        common.dir.scripts
      ),
      upath.resolve(__dirname, 'node_modules')
    ]
  },
  devtool: isDev ? 'eval-source-map' : false,
  plugins: [
    isDev &&
      new WebpackNotifierPlugin({
        skipFirstNotification: true
      })
  ].filter(Boolean)
}
