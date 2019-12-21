import path from 'path'

import config from './config'

const isDev = config.get('mode') !== 'production'

export default {
  mode: config.get('mode'),
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          minSize: 0,
          name: path.join(
            config.get('dir.assets'),
            config.get('dir.scripts'),
            'vendors'
          ),
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: {
      name: path.join(
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
