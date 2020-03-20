const path = require('path')

const CleanCSS = require('clean-css')
const csso = require('csso')
const Fiber = require('fibers')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpPostcss = require('gulp-postcss')
const gulpSass = require('gulp-sass')
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpStylelint = require('gulp-stylelint')
const sass = require('sass')
const through2 = require('through2')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')

const srcPaths = path.posix.join(
  config.get('srcDir'),
  'assets/styles/**/*.scss'
)
const isDev = config.get('mode') !== 'production'
const cleanCss = new CleanCSS({
  level: 2,
  rebase: false
})

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
        through2.obj((file, encoding, cb) => {
          const cssoResult = csso.minify(file.contents.toString(), {
            forceMediaMerge: true
          })

          const cleanCssResult = cleanCss.minify(cssoResult.css)

          // eslint-disable-next-line no-param-reassign
          file.contents = Buffer.from(cleanCssResult.styles)

          cb(null, file)
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
