const gulp = require('gulp')
const runSequence = require('run-sequence')

const build = done => {
  runSequence(
    'clean',
    ['copy', 'html', 'images', 'scripts', 'styles'],
    done
  )
}

gulp.task('build', build)
