const gulp = require('gulp')

const dev = () => {
  gulp.start('default')
}

gulp.task('dev', ['build'], dev)
