const path = require('path')

const gulp = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpIf = require('gulp-if')
const gulpImagemin = require('gulp-imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')

const isDev = config.get('mode') !== 'production'

module.exports = function images() {
  return gulp
    .src(common.srcPaths.images, {
      base: config.get('srcDir')
    })
    .pipe(
      gulpIf(
        isDev,
        gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
      )
    )
    .pipe(
      gulpIf(
        !isDev,
        gulpImagemin([
          imageminPngquant(),
          imageminMozjpeg(),
          gulpImagemin.gifsicle({
            optimizationLevel: 3
          }),
          gulpImagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnknownsAndDefaults: false },
              { removeUselessDefs: false },
              { cleanupIDs: false }
            ]
          })
        ])
      )
    )
    .pipe(detectConflict())
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(gulpIf(isDev, common.server.stream()))
}
