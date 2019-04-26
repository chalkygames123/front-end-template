import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import nodeSassMagicImporter from 'node-sass-magic-importer'
import sassGraphGlob from 'sass-graph-glob'
import stripAnsi from 'strip-ansi'
import through2 from 'through2'
import upath from 'upath'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

export default function styles() {
  return gulp
    .src(common.srcPaths.styles, {
      base: config.get('srcDir')
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError(error => {
            return stripAnsi(error.message)
          })
        })
      )
    )
    .pipe($.if(isDev, $.cached('styles')))
    .pipe(
      $.if(
        gulp.lastRun(styles),
        through2.obj(function(file, encoding, cb) {
          const srcPaths = []
          const graph = upath
            .relative('', file.path)
            .startsWith(
              upath.join(
                config.get('srcDir'),
                common.dir.assets,
                common.dir.styles,
                'pages'
              )
            )
            ? sassGraphGlob.parseDir(file.dirname)
            : sassGraphGlob.parseDir(
                upath.join(
                  config.get('srcDir'),
                  common.dir.assets,
                  common.dir.styles
                )
              )

          srcPaths.push(file.path)

          graph.visitAncestors(file.path, path => {
            if (srcPaths.indexOf(path) < 0) {
              srcPaths.push(path)
            }
          })

          gulp
            .src(srcPaths, {
              base: config.get('srcDir')
            })
            .on('data', file => {
              this.push(file)
            })
            .on('end', () => {
              cb()
            })
        })
      )
    )
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.postcss())
    .pipe(
      $.dartSass({
        importer: nodeSassMagicImporter(),
        includePaths: upath.join(
          config.get('srcDir'),
          common.dir.assets,
          common.dir.styles
        ),
        fiber: Fiber
      })
    )
    .pipe(
      $.rename({
        extname: '.css'
      })
    )
    .pipe(
      $.if(
        isDev,
        $.sourcemaps.write({
          sourceRoot: `/${config.get('srcDir')}`
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.csso({
          forceMediaMerge: true
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.cleanCss({
          level: 2,
          rebase: false
        })
      )
    )
    .pipe(utils.detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, $.gzip()))
    .pipe($.if(config.get('gzip') && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.get('gzip') && !isDev,
        gulp.dest(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(common.server.stream())
}
