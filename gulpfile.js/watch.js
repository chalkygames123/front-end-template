const path = require('path')

const gulp = require('gulp')

const common = require(path.resolve('gulpfile.js/common'))
const copy = require('./copy')
const html = require('./html')
const images = require('./images')
const scripts = require('./scripts')
const styles = require('./styles')

function watch () {
  gulp.watch(common.srcPaths.copy, gulp.series(copy))
  gulp.watch(common.srcPaths.html, gulp.series(html))
  gulp.watch(common.srcPaths.images, gulp.series(images))
  gulp.watch(common.srcPaths.scripts, gulp.series(scripts))
  gulp.watch(common.srcPaths.styles, gulp.series(styles))
}

module.exports = watch
