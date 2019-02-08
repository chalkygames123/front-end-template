import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development'

export default function images() {
  return gulp
    .src(common.srcPaths.images, {
      base: config.srcDir
    })
    .pipe($.changed(`${config.distDir}/${config.baseDir}`))
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.imagemin([
          $.imagemin.gifsicle({
            optimizationLevel: 3
          }),
          $.imagemin.jpegtran(),
          $.imagemin.svgo({
            plugins: [
              {
                removeUselessDefs: false
              },
              {
                removeViewBox: false
              },
              {
                cleanupIDs: false
              }
            ]
          }),
          imageminPngquant()
        ])
      )
    )
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe($.if(config.webp, $.filter('**/*.+(png|jp?(e)g)')))
    .pipe(
      $.if(
        config.webp && !isDev,
        $.imagemin([
          imageminWebp({
            quality: '90',
            method: 6
          })
        ])
      )
    )
    .pipe(
      $.if(
        config.webp,
        $.rename({
          extname: '.webp'
        })
      )
    )
    .pipe($.if(config.webp, utils.detectConflict()))
    .pipe($.if(config.webp, gulp.dest(`${config.distDir}/${config.baseDir}`)))
    .pipe(common.server.stream())
}
