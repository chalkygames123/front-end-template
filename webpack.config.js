import upath from 'upath'

import config from './config'

const isDev = process.env.NODE_ENV !== 'production'

export default {
  mode: process.env.NODE_ENV,
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: upath.join(
            config.get('dir.assets'),
            config.get('dir.scripts'),
            'vendors'
          ),
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: {
      name: upath.join(
        config.get('dir.assets'),
        config.get('dir.scripts'),
        'runtime'
      )
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
  devtool: isDev ? 'eval-source-map' : false
}
