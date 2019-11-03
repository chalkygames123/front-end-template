import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import sass from 'sass'
import stripAnsi from 'strip-ansi'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

$.sass.compiler = sass

export default function styles() {
  return gulp
    .src(config.get('srcPaths.styles'), {
      base: config.get('srcDir')
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError(error => {
            return stripAnsi(error.message)
          })
        })
      )
    )
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.postcss())
    .pipe(
      $.sass({
        fiber: Fiber
      })
    )
    .pipe(
      $.if(
        isDev,
        $.sourcemaps.write({
          sourceRoot: `/${config.get('srcDir')}`
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.csso({
          forceMediaMerge: true
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.cleanCss({
          level: 2,
          rebase: false
        })
      )
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, $.gzip()))
    .pipe($.if(config.get('gzip') && !isDev, detectConflict()))
    .pipe(
      $.if(
        config.get('gzip') && !isDev,
        gulp.dest(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(common.server.stream())
}
