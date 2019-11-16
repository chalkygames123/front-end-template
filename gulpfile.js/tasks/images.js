import stream from 'stream'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

export default function images(cb) {
  stream.pipeline(
    gulp.src(config.get('srcPaths.images'), {
      base: config.get('srcDir')
    }),
    $.changed(upath.join(config.get('distDir'), config.get('site.basePath'))),
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
    ),
    detectConflict(),
    gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath'))),
    $.if(config.get('webp'), $.filter('**/*.+(png|jp?(e)g)')),
    $.if(
      config.get('webp') && !isDev,
      $.imagemin([
        imageminWebp({
          quality: '90',
          method: 6
        })
      ])
    ),
    $.if(
      config.get('webp'),
      $.rename({
        extname: '.webp'
      })
    ),
    $.if(config.get('webp'), detectConflict()),
    $.if(
      config.get('webp'),
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    ),
    $.if(isDev, common.server.stream()),
    cb
  )
}
