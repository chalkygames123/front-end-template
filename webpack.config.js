const fs = require('fs')
const path = require('path')

const ESLintPlugin = require('eslint-webpack-plugin')
const Fdir = require('fdir').fdir
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

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: config.get('mode'),
  async entry() {
    const filePaths = await crawler.withPromise()

    return Object.fromEntries(
      filePaths.map((filePath) => {
        const chunkName = path
          .relative(path.join(config.get('srcDir'), 'assets/scripts'), filePath)
          .replace(/\.[^.]+$/, '')
        const entryPoint = `./${filePath}`

        return [chunkName, entryPoint]
      })
    )
  },
  output: {
    path: path.join(
      __dirname,
      config.get('distDir'),
      config.get('publicPath'),
      'assets/scripts'
    ),
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          minSize: 0,
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
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
  devtool: isDev ? 'eval-source-map' : false,
  context: __dirname,
  plugins: [new ESLintPlugin()],
}
