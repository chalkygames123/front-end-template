const gulp = require('gulp')

const config = require('../../config')
const common = require('../common')

const copy = require('./copy')
const images = require('./images')
const sprites = require('./sprites')
const styles = require('./styles')
const templates = require('./templates')

module.exports = function watch(cb) {
  gulp.watch(config.get('srcPaths.copy'), copy)
  gulp.watch(config.get('srcPaths.images'), images)
  gulp.watch(config.get('srcPaths.includes'), templates)
  gulp.watch(config.get('srcPaths.layouts'), templates)
  gulp.watch(config.get('srcPaths.pages'), templates)
  gulp.watch(config.get('srcPaths.sprites'), sprites)
  gulp.watch(config.get('srcPaths.styles'), styles)

  if (!common.webpackCompiler.running) {
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
