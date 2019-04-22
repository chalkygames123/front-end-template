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
const isDev = config.get('env') === 'development'

export default function scripts() {
  return gulp
    .src(common.srcPaths.scripts, {
      base: config.get('srcDir')
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
        file.base = config.get('srcDir')
        return upath.toUnix(upath.trimExt(file.relative))
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.get('distDir')}/${config.get('site.basePath')}`))
    .pipe($.if(config.get('gzip') && !isDev, $.gzip()))
    .pipe($.if(config.get('gzip') && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.get('gzip') && !isDev,
        gulp.dest(`${config.get('distDir')}/${config.get('site.basePath')}`)
      )
    )
    .pipe(common.server.stream())
}
