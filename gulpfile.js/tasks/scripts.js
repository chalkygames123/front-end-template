import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'
import vinylNamed from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'
import webpackConfig from '../../webpack.config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development'

export default function scripts() {
  return gulp
    .src(common.srcPaths.scripts, {
      base: config.srcDir
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: () => false
        })
      )
    )
    .pipe($.filter(`**/!(_)*${common.ext.scripts}`))
    .pipe(
      vinylNamed(file => {
        file.base = config.srcDir
        return upath.normalize(upath.trimExt(file.relative))
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.gzip && !isDev,
        gulp.dest(`${config.distDir}/${config.baseDir}`)
      )
    )
    .pipe(common.server.stream())
}
