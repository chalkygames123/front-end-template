const path = require('path')

const Fiber = require('fibers')
const gulp = require('gulp')
const gulpCleanCss = require('gulp-clean-css')
const gulpCsso = require('gulp-csso')
const gulpIf = require('gulp-if')
const gulpPostcss = require('gulp-postcss')
const gulpSass = require('gulp-sass')
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpStylelint = require('gulp-stylelint')
const sass = require('sass')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')

const srcPaths = path.posix.join(
  config.get('srcDir'),
  config.get('dir.assets'),
  config.get('dir.styles'),
  '**',
  `*${config.get('ext.styles')}`
)
const isDev = config.get('mode') !== 'production'

gulpSass.compiler = sass

function styles() {
  return gulp
    .src(srcPaths, {
      base: config.get('srcDir')
    })
    .pipe(gulpIf(isDev, gulpSourcemaps.init()))
    .pipe(
      gulpStylelint({
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      })
    )
    .pipe(
      gulpSass({
        fiber: Fiber
      })
    )
    .pipe(gulpPostcss())
    .pipe(
      gulpIf(
        isDev,
        gulpSourcemaps.write({
          sourceRoot: `/${config.get('srcDir')}`
        })
      )
    )
    .pipe(
      gulpIf(
        !isDev,
        gulpCsso({
          forceMediaMerge: true
        })
      )
    )
    .pipe(
      gulpIf(
        !isDev,
        gulpCleanCss({
          level: 2,
          rebase: false
        })
      )
    )
    .pipe(detectConflict())
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  gulp.watch(srcPaths, styles)
}

module.exports = styles
