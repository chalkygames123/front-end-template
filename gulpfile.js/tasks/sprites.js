const path = require('path')

const gulp = require('gulp')
const gulpSvgSprite = require('gulp-svg-sprite')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')
const ignore = require('../utils/ignore')

const srcPaths = path.posix.join(
  config.get('srcDir'),
  'assets/sprites/**/*.svg'
)
const isDev = config.get('mode') !== 'production'

function sprites() {
  return gulp
    .src(srcPaths, {
      base: config.get('srcDir'),
    })
    .pipe(ignore())
    .pipe(
      gulpSvgSprite({
        shape: {
          id: {
            generator(name) {
              const destRelativeName = path.relative('assets/sprites', name)
              const directorySeparatedName = destRelativeName
                .split(path.sep)
                .join(this.separator)

              return path.basename(
                directorySeparatedName.replace(/\s+/g, this.whitespace),
                '.svg'
              )
            },
          },
          transform: [
            !isDev && {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { removeUnknownsAndDefaults: false },
                  { removeUselessDefs: false },
                  { cleanupIDs: false },
                ],
              },
            },
          ].filter(Boolean),
        },
        mode: {
          symbol: {
            dest: 'assets',
            sprite: 'sprite.symbol.svg',
          },
        },
      })
    )
    .pipe(detectConflict())
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  gulp.watch(srcPaths, sprites)
}

module.exports = sprites
