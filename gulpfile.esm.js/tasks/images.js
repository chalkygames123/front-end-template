import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

export default function images() {
  return gulp
    .src(common.srcPaths.images, {
      base: config.get('srcDir')
    })
    .pipe($.changed(`${config.get('distDir')}/${config.get('basePath')}`))
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
    .pipe(gulp.dest(`${config.get('distDir')}/${config.get('basePath')}`))
    .pipe($.if(config.get('webp'), $.filter('**/*.+(png|jp?(e)g)')))
    .pipe(
      $.if(
        config.get('webp') && !isDev,
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
        config.get('webp'),
        $.rename({
          extname: '.webp'
        })
      )
    )
    .pipe($.if(config.get('webp'), utils.detectConflict()))
    .pipe(
      $.if(
        config.get('webp'),
        gulp.dest(`${config.get('distDir')}/${config.get('basePath')}`)
      )
    )
    .pipe(common.server.stream())
}
