import path from 'path'

import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpFilter from 'gulp-filter'
import gulpIf from 'gulp-if'
import gulpImagemin from 'gulp-imagemin'
import gulpRename from 'gulp-rename'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'
import lazypipe from 'lazypipe'

import config from '../../config'
import detectConflict from '../utils/detectConflict'

const isDev = config.get('mode') !== 'production'
const webpChannel = lazypipe()
  .pipe(() => gulpFilter('**/*.+(png|jp?(e)g)'))
  .pipe(() =>
    gulpIf(
      !isDev,
      gulpImagemin([
        imageminWebp({
          quality: '90',
          method: 6
        })
      ])
    )
  )
  .pipe(() =>
    gulpRename({
      extname: '.webp'
    })
  )
  .pipe(detectConflict)
  .pipe(() =>
    gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
  )

export default function images() {
  return gulp
    .src(config.get('srcPaths.images'), {
      base: config.get('srcDir')
    })
    .pipe(
      gulpIf(
        isDev,
        gulpChanged(
          path.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(
      gulpIf(
        !isDev,
        gulpImagemin([
          imageminPngquant(),
          imageminMozjpeg(),
          gulpImagemin.gifsicle({
            optimizationLevel: 3
          }),
          gulpImagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnknownsAndDefaults: false },
              { removeUselessDefs: false },
              { cleanupIDs: false }
            ]
          })
        ])
      )
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(gulpIf(config.get('webp'), webpChannel()))
}
