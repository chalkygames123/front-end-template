const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const server = require('browser-sync').create()

module.exports = { server }

const serve = () => {
  return server.init({
    ui: false,
    server: config.outputDir,
    startPath: config.baseUrl
  })
}

gulp.task('serve', serve)
