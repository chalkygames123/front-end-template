import stream from 'stream'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

export default function sprites(cb) {
  stream.pipeline(
    ...[
      gulp.src(config.get('srcPaths.sprites'), {
        base: config.get('srcDir')
      }),
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
          transform: [
            !isDev && {
              svgo: {
                plugins: [
                  { removeUselessDefs: false },
                  { removeViewBox: false },
                  { cleanupIDs: false }
                ]
              }
            }
          ].filter(Boolean)
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
      }),
      detectConflict(),
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath'))),
      isDev && common.server.stream()
    ].filter(Boolean),
    cb
  )
}
