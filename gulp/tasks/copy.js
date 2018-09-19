const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

const copy = () => {
  return gulp.src(config.copy.src.globs, config.copy.src.options)
    .pipe($.changed(`${config.paths.outputDir}${config.paths.baseUrl}`))
    .pipe(gulp.dest(`${config.paths.outputDir}${config.paths.baseUrl}`))
    .pipe(config.server.stream())
}

gulp.task('copy', copy)
