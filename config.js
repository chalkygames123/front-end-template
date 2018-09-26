const env = process.env.NODE_ENV || 'production'

module.exports = {
  srcDir: 'src',
  baseUrl: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  env,
  isDev: env === 'development'
}
