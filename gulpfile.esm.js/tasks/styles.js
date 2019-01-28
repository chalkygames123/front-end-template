import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import nodeSassMagicImporter from 'node-sass-magic-importer'
import sassGraphGlob from 'sass-graph-glob'
import through2 from 'through2'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'
import postcssConfig from '../../postcss.config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development'

export default function styles() {
  return gulp
    .src(common.srcPaths.styles, {
      base: config.srcDir
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe($.if(isDev, $.cached('sass')))
    .pipe(
      $.if(
        gulp.lastRun(styles),
        through2.obj(function(file, encoding, cb) {
          const graph = sassGraphGlob.parseDir(
            `${config.srcDir}/${common.dir.assets}/${common.dir.styles}`
          )
          const srcPaths = []

          srcPaths.push(file.path)

          graph.visitAncestors(file.path, path => {
            if (srcPaths.indexOf(path) < 0) {
              srcPaths.push(path)
            }
          })

          gulp
            .src(srcPaths, {
              base: config.srcDir
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
    .pipe(
      $.stylelint({
        reporters: [
          {
            failOnError: true,
            formatter: 'string',
            console: true
          }
        ]
      })
    )
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe(
      $.dartSass({
        importer: nodeSassMagicImporter(),
        includePaths: `${config.srcDir}/${common.dir.assets}/${
          common.dir.styles
        }`,
        fiber: Fiber
      })
    )
    .pipe($.postcss(postcssConfig.plugins, postcssConfig.options)) // TODO: postcss-load-config が依存する cosmiconfig が v5 に更新されたら引数を空にする
    .pipe(
      $.rename({
        extname: '.css'
      })
    )
    .pipe(
      $.if(
        isDev,
        $.sourcemaps.write({
          sourceRoot: `/${config.srcDir}`
        })
      )
    )
    .pipe($.if(!isDev, $.csso()))
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
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.gzip && !isDev,
        gulp.dest(`${config.distDir}/${config.baseDir}`)
      )
    )
    .pipe(common.server.stream())
}
