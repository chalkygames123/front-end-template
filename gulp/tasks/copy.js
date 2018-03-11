const gulp = require('gulp')
const config = require('../config')
const $ = config.plugins

const copy = () => {
  return gulp.src(config.copy.src.globs, config.copy.src.options)
    .pipe($.changed(config.paths.dest))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.program.watch, config.myServer.stream()))
}

gulp.task('copy', copy)
