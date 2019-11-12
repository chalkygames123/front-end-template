import stream from 'stream'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'
import vinylNamed from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'
import webpackConfig from '../../webpack.config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

export default function scripts(cb) {
  stream.pipeline(
    gulp.src(config.get('srcPaths.scripts'), {
      base: config.get('srcDir')
    }),
    $.eslint(),
    $.eslint.format(),
    $.if(!isDev, $.eslint.failOnError()),
    $.filter(`**/!(_)*${config.get('ext.scripts')}`),
    vinylNamed(file => {
      return upath.toUnix(upath.trimExt(file.relative))
    }),
    webpackStream(webpackConfig, webpack),
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
