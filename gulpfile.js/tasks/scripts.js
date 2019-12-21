import path from 'path'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
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
    .pipe(
      $.filter(
        `${config.get('dir.assets')}/${config.get('dir.scripts')}/${config.get(
          'dir.pages'
        )}/**/!(_)*`
      )
    )
    .pipe(
      vinylNamed(file => {
        return file.relative.replace(/\.[^.]+$/, '')
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(detectConflict())
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, common.gzipChannel()))
    .pipe($.if(isDev, common.server.stream()))
}
