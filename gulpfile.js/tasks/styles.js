import path from 'path'

import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import postcssReporter from 'postcss-reporter'
import postcssScss from 'postcss-scss'
import sass from 'sass'
import stylelint from 'stylelint'

import config from '../../config'
import common from '../common'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

$.sass.compiler = sass

export default function styles() {
  return gulp
    .src(config.get('srcPaths.styles'), {
      base: config.get('srcDir')
    })
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe(
      $.postcss(
        [
          stylelint(),
          postcssReporter({
            clearReportedMessages: true
          })
        ],
        {
          syntax: postcssScss
        }
      )
    )
    .pipe(
      $.sass({
        fiber: Fiber
      })
    )
    .pipe($.postcss())
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
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, common.gzipChannel()))
}
