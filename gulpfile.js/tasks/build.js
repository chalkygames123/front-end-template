const { parallel, series } = require('gulp')

const clean = require('./clean')
const copy = require('./copy')
const images = require('./images')
const scripts = require('./scripts')
const styles = require('./styles')
const templates = require('./templates')

module.exports = series(
  clean,
  parallel(copy, images, scripts, styles, templates)
)
