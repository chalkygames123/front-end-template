const gulp = require('gulp')

const common = require('./common')
const copy = require('./copy')
const html = require('./html')
const images = require('./images')
const scripts = require('./scripts')
const styles = require('./styles')

function watch () {
  gulp.watch(common.srcPaths.copy, copy)
  gulp.watch(common.srcPaths.html, html)
  gulp.watch(common.srcPaths.images, images)
  gulp.watch(common.srcPaths.scripts, scripts)
  gulp.watch(common.srcPaths.styles, styles)
}

module.exports = watch
