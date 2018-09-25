const gulp = require('gulp')
const config = require(require('path').resolve('config'))

const serve = () => {
  return config.server.init({
    ui: false,
    server: config.outputDir,
    startPath: config.baseUrl
  })
}

gulp.task('serve', serve)
