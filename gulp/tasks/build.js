const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')

const build = done => {
  runSequence(
    'clean',
    ...config.watch
      ? [['copy', 'html', 'images', 'styles'], 'default']
      : [['copy', 'html', 'images', 'styles', 'scripts']],
    done
  )
}

gulp.task('build', build)
