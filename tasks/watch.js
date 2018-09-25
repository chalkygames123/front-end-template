const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const watch = () => {
  $.watch(require('./copy').src, () => {
    gulp.start('copy')
  })

  $.watch(require('./html').src, () => {
    gulp.start('html')
  })

  $.watch(require('./images').src, () => {
    gulp.start('images')
  })

  $.watch(require('./scripts').src, () => {
    gulp.start('scripts')
  })

  $.watch(require('./styles').src, () => {
    gulp.start('styles')
  })
}

gulp.task('watch', watch)
