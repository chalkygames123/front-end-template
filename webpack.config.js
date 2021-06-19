const fs = require('fs')
const path = require('path')

const ESLintPlugin = require('eslint-webpack-plugin')
const { fdir: Fdir } = require('fdir')
const ignore = require('ignore')

const config = require('./config')

const isDev = config.get('mode') !== 'production'
const ig = ignore().add(fs.readFileSync('.gitignore', 'utf8'))
const crawler = new Fdir()
  .withBasePath()
  .filter((filePath) => {
    const basename = path.basename(filePath)

    return (
      !ig.ignores(filePath) &&
      !basename.startsWith('.') &&
      basename.endsWith('.js')
    )
  })
  .crawl(path.posix.join(config.get('srcDir'), 'assets/scripts'))

require('dotenv').config()

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: config.get('mode'),
  async entry() {
    const filePaths = await crawler.withPromise()

    return Object.fromEntries(
      filePaths.map((filePath) => {
        const chunkName = filePath.replace(/\.[^.]+$/, '')
        const entryPoint = `./${filePath}`

        return [chunkName, entryPoint]
      })
    )
  },
  output: {
    path: path.join(__dirname, config.get('distDir'), config.get('publicPath')),
    publicPath: config.get('publicPath'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, config.get('srcDir'), 'assets/scripts')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': __dirname,
    },
  },
  devtool: isDev ? 'eval-source-map' : false,
  context: __dirname,
  devServer: {
    static: [
      {
        directory: path.join(__dirname, config.get('srcDir'), 'public'),
        publicPath: config.get('publicPath'),
      },
      {
        directory: path.join(__dirname, config.get('srcDir'), 'assets/images'),
        publicPath: path.join(config.get('publicPath'), 'assets/images'),
      },
      {
        directory: path.join(__dirname, config.get('distDir')),
        publicPath: '/',
      },
    ],
    https:
      process.env.SSL_CERTIFICATE_KEY && process.env.SSL_CERTIFICATE
        ? {
            key: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY),
            cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
          }
        : false,
  },
  plugins: [
    new ESLintPlugin({
      files: [path.join(config.get('srcDir'), 'assets/scripts')],
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'assets/scripts/runtime',
    },
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          chunks: 'all',
          enforce: true,
          name: 'assets/scripts/vendors',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
}
