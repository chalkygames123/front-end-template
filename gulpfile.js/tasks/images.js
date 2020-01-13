const path = require('path')

const gulp = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpFilter = require('gulp-filter')
const gulpIf = require('gulp-if')
const gulpImagemin = require('gulp-imagemin')
const gulpRename = require('gulp-rename')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')

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
        gulpChanged(
          path.join(config.get('distDir'), config.get('site.basePath'))
        )
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
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(gulpIf(isDev, common.server.stream()))
    .pipe(gulpIf(config.get('webp'), gulpFilter('**/*.+(png|jp?(e)g)')))
    .pipe(
      gulpIf(
        config.get('webp') && !isDev,
        gulpImagemin([
          imageminWebp({
            method: 6
          })
        ])
      )
    )
    .pipe(
      gulpIf(
        config.get('webp'),
        gulpRename({
          extname: '.webp'
        })
      )
    )
    .pipe(gulpIf(config.get('webp'), detectConflict()))
    .pipe(
      gulpIf(
        config.get('webp'),
        gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
      )
    )
    .pipe(gulpIf(isDev, common.server.stream()))
}
