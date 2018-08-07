const gulp = require('gulp')

const development = () => {
  gulp.start('default')
}

gulp.task('development', ['build'], development)
