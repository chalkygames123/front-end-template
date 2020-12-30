const path = require('path')

const { dest, src, watch } = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpImagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')

const config = require('../../config')
const common = require('../common')
const ignore = require('../utils/ignore')
const pipeIf = require('../utils/pipe-if')

const srcPaths = path.posix.join(
  config.get('srcDir'),
  'assets/images/**/*.+(png|jp?(e)g|gif|svg)'
)
const isDev = config.get('mode') !== 'production'

function images() {
  return src(srcPaths, {
    base: config.get('srcDir'),
  })
    .pipe(ignore())
    .pipe(
      pipeIf(
        isDev,
        gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
      )
    )
    .pipe(
      pipeIf(
        !isDev,
        gulpImagemin([
          imageminPngquant(),
          gulpImagemin.mozjpeg({
            quality: 85,
          }),
          gulpImagemin.gifsicle({
            optimizationLevel: 3,
          }),
          gulpImagemin.svgo({
            plugins: [
              { cleanupIDs: false },
              { removeUnknownsAndDefaults: false },
              { removeUselessDefs: false },
              { removeViewBox: false },
            ],
          }),
        ])
      )
    )
    .pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  watch(srcPaths, images)
}

module.exports = images
