const gulp = require('gulp')

const development = done => {
  gulp.start('default')
}

gulp.task('development', ['build'], development)
