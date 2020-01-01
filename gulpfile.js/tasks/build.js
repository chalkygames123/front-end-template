const gulp = require('gulp')

const clean = require('./clean')
const copy = require('./copy')
const images = require('./images')
const scripts = require('./scripts')
const sprites = require('./sprites')
const styles = require('./styles')
const templates = require('./templates')

module.exports = gulp.series(
  clean,
  gulp.parallel(copy, images, scripts, sprites, styles, templates)
)
