import path from 'path'

import Fiber from 'fibers'
import gulp from 'gulp'
import gulpCleanCss from 'gulp-clean-css'
import gulpCsso from 'gulp-csso'
import gulpIf from 'gulp-if'
import gulpPostcss from 'gulp-postcss'
import gulpSass from 'gulp-sass'
import gulpSourcemaps from 'gulp-sourcemaps'
import gulpStylelint from 'gulp-stylelint'
import sass from 'sass'

import config from '../../config'
import common from '../common'
import detectConflict from '../utils/detectConflict'

const isDev = config.get('mode') !== 'production'

gulpSass.compiler = sass

export default function styles() {
  return gulp
    .src(config.get('srcPaths.styles'), {
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
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(gulpIf(config.get('gzip') && !isDev, common.gzipChannel()))
}
