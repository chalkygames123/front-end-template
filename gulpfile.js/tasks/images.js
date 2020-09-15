const path = require('path')

const gulp = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpIf = require('gulp-if')
const gulpImagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')

const config = require('../../config')
const common = require('../common')
const ignore = require('../utils/ignore')

const srcPaths = path.posix.join(
  config.get('srcDir'),
  'assets/images/**/*.+(png|jp?(e)g|gif|svg)'
)
const isDev = config.get('mode') !== 'production'

function images() {
  return gulp
    .src(srcPaths, {
      base: config.get('srcDir'),
    })
    .pipe(ignore())
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
          gulpImagemin.mozjpeg({
            quality: 90,
          }),
          gulpImagemin.gifsicle({
            optimizationLevel: 3,
          }),
          gulpImagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnknownsAndDefaults: false },
              { removeUselessDefs: false },
              { cleanupIDs: false },
            ],
          }),
        ])
      )
    )
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  gulp.watch(srcPaths, images)
}

module.exports = images
