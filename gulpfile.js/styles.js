const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const nodeSassMagicImporter = require('node-sass-magic-importer')
const sassGraphGlob = require('sass-graph-glob')
const through2 = require('through2')
const upath = require('upath')

const common = require('./common')
const config = require('../config')
const images = require('./images')
const utils = require('./utils')

const isDev = common.env === 'development'

$.sass.compiler = require('sass')

function styles () {
  return gulp
    .src(common.srcPaths.styles, {
      base: config.srcDir
    })
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe($.if(isDev, $.cached('sass')))
    .pipe($.if(gulp.lastRun(styles), through2.obj(function (file, encoding, cb) {
      const graph = sassGraphGlob.parseDir(upath.join(config.srcDir, config.dir.assets, config.dir.styles))
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
        .on('data', (file) => {
          this.push(file)
        })
        .on('end', () => {
          cb()
        })
    })))
    .pipe($.stylelint({
      reporters: [
        {
          failOnError: true,
          formatter: 'string',
          console: true
        }
      ]
    }))
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.sass({
      importer: nodeSassMagicImporter(),
      includePaths: upath.join(config.srcDir, config.dir.assets, config.dir.styles),
      outputStyle: 'expanded'
    }))
    .pipe($.postcss())
    .pipe($.rename({
      extname: '.css'
    }))
    .pipe($.if(isDev, $.sourcemaps.write({
      sourceRoot: `/${config.srcDir}`
    })))
    .pipe($.if(!isDev, $.cleanCss({
      rebase: false
    })))
    .pipe($.if(!isDev, $.csso()))
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(upath.join(config.distDir, config.basePath)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, utils.detectConflict()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(upath.join(config.distDir, config.basePath))))
    .pipe(common.server.stream())
}

module.exports = gulp.series(images, styles)
