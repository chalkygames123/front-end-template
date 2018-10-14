const gulp = require('gulp')

const clean = require('./clean')
const copy = require('./copy')
const html = require('./html')
const images = require('./images')
const scripts = require('./scripts')
const styles = require('./styles')

module.exports = gulp.series(
  clean,
  gulp.parallel(copy, html, images, scripts, styles)
)
