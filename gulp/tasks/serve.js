const gulp = require('gulp')
const config = require('../config')

const serve = () => {
  return config.server.init(config.serve.browserSync)
}

gulp.task('serve', serve)
