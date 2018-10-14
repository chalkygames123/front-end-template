const path = require('path')

const gulp = require('gulp')

const config = require(path.resolve('config'))
const copy = require('./copy')
const html = require('./html')
const images = require('./images')
const scripts = require('./scripts')
const styles = require('./styles')

function watch () {
  gulp.watch(config.srcPaths.copy, gulp.series(copy))
  gulp.watch(config.srcPaths.html, gulp.series(html))
  gulp.watch(config.srcPaths.images, gulp.series(images))
  gulp.watch(config.srcPaths.scripts, gulp.series(scripts))
  gulp.watch(config.srcPaths.styles, gulp.series(styles))
}

module.exports = watch
