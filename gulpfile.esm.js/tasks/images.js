import path from 'path'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'
const spritesFilter = $.filter(
  `${config.get('distDir')}/${common.dir.assets}/${
    common.dir.images
  }/sprites/**/*.svg`,
  {
    restore: true
  }
)

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
    .pipe(spritesFilter)
    .pipe(
      $.svgSprite({
        shape: {
          id: {
            generator: function(name, file) {
              const destRelativeName = name.replace(
                `${common.dir.assets}/${common.dir.images}/sprites/`,
                ''
              )
              const directorySeparatedName = destRelativeName
                .split(path.sep)
                .join(this.separator)
              const trimmedName = path.basename(
                directorySeparatedName.replace(/\s+/g, this.whitespace),
                '.svg'
              )
              return trimmedName
            }
          },
          transform: null
        },
        mode: {
          symbol: {
            dest: `${common.dir.assets}/${common.dir.images}`,
            sprite: 'sprite.symbol.svg'
          }
        }
      })
    )
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.get('distDir')}/${config.get('basePath')}`))
    .pipe(spritesFilter.restore)
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
