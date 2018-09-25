const server = require('browser-sync').create()
const env = process.env.NODE_ENV || 'production'

module.exports = {
  srcDir: 'src',
  baseUrl: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  server,
  env,
  isDev: env === 'development'
}
