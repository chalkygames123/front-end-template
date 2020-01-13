const gulp = require('gulp')

const common = require('../common')

const copy = require('./copy')
const images = require('./images')
const sprites = require('./sprites')
const styles = require('./styles')
const templates = require('./templates')

module.exports = function watch(cb) {
  gulp.watch(common.srcPaths.copy, copy)
  gulp.watch(common.srcPaths.images, images)
  gulp.watch(common.srcPaths.includes, templates)
  gulp.watch(common.srcPaths.layouts, templates)
  gulp.watch(common.srcPaths.pages, templates)
  gulp.watch(common.srcPaths.sprites, sprites)
  gulp.watch(common.srcPaths.styles, styles)

  if (!common.webpackCompiler.watchMode) {
    common.webpackCompiler.watch({}, (err, stats) => {
      // eslint-disable-next-line no-console
      console.log(
        stats.toString({
          colors: true
        })
      )
    })
  }

  cb()
}
