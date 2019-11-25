import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'
import vinylNamed from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

import config from '../../config'
import webpackConfig from '../../webpack.config'
import common from '../common'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

export default function scripts() {
  return gulp
    .src(config.get('srcPaths.scripts'), {
      base: config.get('srcDir')
    })
    .pipe($.filter(`**/!(_)*${config.get('ext.scripts')}`))
    .pipe(
      vinylNamed(file => {
        return upath.toUnix(upath.trimExt(file.relative))
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, common.gzipChannel()))
    .pipe($.if(isDev, common.server.stream()))
}
