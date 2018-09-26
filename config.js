const env = process.env.NODE_ENV || 'production'

module.exports = {
  srcDir: 'src',
  baseUrl: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  webp: false,
  env,
  isDev: env === 'development'
}
