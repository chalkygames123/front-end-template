const path = require('path')

const { dest, src, watch } = require('gulp')
const gulpChanged = require('gulp-changed')

const config = require('../../config')
const common = require('../common')
const pipeIf = require('../utils/pipe-if')

const srcPaths = path.posix.join(config.get('srcDir'), 'static/**')
const isDev = config.get('mode') !== 'production'

function copy() {
  return src(srcPaths, {
    base: path.join(config.get('srcDir'), 'static'),
    nodir: true,
  })
    .pipe(
      pipeIf(
        isDev,
        gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
      )
    )
    .pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  watch(srcPaths, copy)
}

module.exports = copy
