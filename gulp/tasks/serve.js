const gulp = require('gulp')
const config = require('../config')

const serve = () => {
  return config.myServer.init(
    config.serve.browserSync
  )
}

gulp.task('serve', serve)
