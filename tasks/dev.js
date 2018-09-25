const gulp = require('gulp')
const runSequence = require('run-sequence')

const dev = done => {
  runSequence(
    'serve',
    'watch',
    done
  )
}

gulp.task('dev', ['build'], dev)
