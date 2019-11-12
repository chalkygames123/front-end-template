import stream from 'stream'

import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import sass from 'sass'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

$.sass.compiler = sass

export default function styles(cb) {
  stream.pipeline(
    gulp.src(config.get('srcPaths.styles'), {
      base: config.get('srcDir')
    }),
    $.if(isDev, $.sourcemaps.init()),
    $.postcss(),
    $.sass({
      fiber: Fiber
    }),
    $.if(
      isDev,
      $.sourcemaps.write({
        sourceRoot: `/${config.get('srcDir')}`
      })
    ),
    $.if(
      !isDev,
      $.csso({
        forceMediaMerge: true
      })
    ),
    $.if(
      !isDev,
      $.cleanCss({
        level: 2,
        rebase: false
      })
    ),
    detectConflict(),
    gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath'))),
    $.if(config.get('gzip') && !isDev, $.gzip()),
    $.if(config.get('gzip') && !isDev, detectConflict()),
    $.if(
      config.get('gzip') && !isDev,
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    ),
    $.if(isDev, common.server.stream()),
    cb
  )
}
