const gulp = require('gulp')

const clean = require('./clean')
const copy = require('./copy')
const html = require('./html')
const scripts = require('./scripts')
const styles = require('./styles')

module.exports = gulp.series(
  clean,
  gulp.parallel(copy, html, scripts, styles)
)
