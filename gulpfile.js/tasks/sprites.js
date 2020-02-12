const path = require('path')

const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpSvgSprite = require('gulp-svg-sprite')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')

const isDev = config.get('mode') !== 'production'

module.exports = function sprites() {
  return gulp
    .src(common.srcPaths.sprites, {
      base: config.get('srcDir')
    })
    .pipe(
      gulpSvgSprite({
        shape: {
          id: {
            generator(name) {
              const destRelativeName = path.relative(
                path.join(
                  config.get('dir.assets'),
                  config.get('dir.images'),
                  config.get('dir.sprites')
                ),
                name
              )
              const directorySeparatedName = destRelativeName
                .split(path.sep)
                .join(this.separator)

              return path.basename(
                directorySeparatedName.replace(/\s+/g, this.whitespace),
                config.get('ext.sprites')
              )
            }
          },
          transform: [
            !isDev && {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { removeUnknownsAndDefaults: false },
                  { removeUselessDefs: false },
                  { cleanupIDs: false }
                ]
              }
            }
          ].filter(Boolean)
        },
        mode: {
          symbol: {
            dest: path.join(config.get('dir.assets'), config.get('dir.images')),
            sprite: 'sprite.symbol.svg'
          }
        }
      })
    )
    .pipe(detectConflict())
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(gulpIf(isDev, common.server.stream()))
}
