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
const isDev = config.get('env') === 'development'
const spritesFilter = $.filter(
  upath.join(
    config.get('distDir'),
    config.get('dir.assets'),
    config.get('dir.images'),
    config.get('dir.sprites'),
    '**',
    `*${config.get('ext.sprites')}`
  ),
  {
    restore: true
  }
)

export default function images() {
  return gulp
    .src(config.get('srcPaths.images'), {
      base: config.get('srcDir')
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe(
      $.changed(upath.join(config.get('distDir'), config.get('site.basePath')))
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
          })
        ])
      )
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(spritesFilter)
    .pipe(
      $.svgSprite({
        shape: {
          id: {
            generator(name) {
              const destRelativeName = upath.relative(
                upath.join(
                  config.get('dir.assets'),
                  config.get('dir.images'),
                  config.get('dir.sprites')
                ),
                name
              )
              const directorySeparatedName = destRelativeName
                .split(upath.sep)
                .join(this.separator)

              return upath.basename(
                directorySeparatedName.replace(/\s+/g, this.whitespace),
                config.get('ext.sprites')
              )
            }
          },
          transform: null
        },
        mode: {
          symbol: {
            dest: upath.join(
              config.get('dir.assets'),
              config.get('dir.images')
            ),
            sprite: 'sprite.symbol.svg'
          }
        }
      })
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
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
    .pipe($.if(config.get('webp'), detectConflict()))
    .pipe(
      $.if(
        config.get('webp'),
        gulp.dest(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(common.server.stream())
}
