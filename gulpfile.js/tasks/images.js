import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'
import lazypipe from 'lazypipe'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'
const webpChannel = lazypipe()
  .pipe(() => $.filter('**/*.+(png|jp?(e)g)'))
  .pipe(() =>
    $.if(
      !isDev,
      $.imagemin([
        imageminWebp({
          quality: '90',
          method: 6
        })
      ])
    )
  )
  .pipe(() =>
    $.rename({
      extname: '.webp'
    })
  )
  .pipe(detectConflict)
  .pipe(() =>
    gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
  )

export default function images() {
  return gulp
    .src(config.get('srcPaths.images'), {
      base: config.get('srcDir')
    })
    .pipe(
      $.if(
        isDev,
        $.changed(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.imagemin([
          imageminPngquant(),
          imageminMozjpeg(),
          $.imagemin.gifsicle({
            optimizationLevel: 3
          }),
          $.imagemin.svgo({
            plugins: [
              { removeUselessDefs: false },
              { removeViewBox: false },
              { cleanupIDs: false }
            ]
          })
        ])
      )
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('webp'), webpChannel()))
    .pipe($.if(isDev, common.server.stream()))
}
