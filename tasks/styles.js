const path = require('path')

const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const ansiRegex = require('ansi-regex')
const nodeSassMagicImporter = require('node-sass-magic-importer')
const server = require('./serve').server

const src = path.join(config.srcDir, config.assetsDir, 'styles/**/*.scss')

module.exports = { src }

const styles = () => {
  return gulp
    .src(src, {
      base: config.srcDir
    })
    .pipe($.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp styles - Error',
          message: error.message.replace(ansiRegex(), ''),
          wait: true
        }

        return options
      })
    }))
    .pipe($.stylelint({
      reporters: [
        {
          failAfterError: true,
          formatter: 'string',
          console: true
        }
      ]
    }))
    .pipe($.if(config.isDev, $.sourcemaps.init()))
    .pipe($.sass({
      importer: nodeSassMagicImporter(),
      includePaths: path.join(config.srcDir, config.assetsDir, 'styles'),
      outputStyle: 'compressed'
    }))
    .pipe($.postcss())
    .pipe($.rename(path => {
      path.extname = '.css'
    }))
    .pipe($.if(config.isDev, $.sourcemaps.write()))
    .pipe($.if(!config.isDev, $.cleanCss({
      rebase: false
    })))
    .pipe($.if(!config.isDev, $.csso()))
    .pipe(gulp.dest(path.join(config.outputDir, config.baseUrl)))
    .pipe($.if(!config.isDev, $.gzip()))
    .pipe($.if(!config.isDev, gulp.dest(path.join(config.outputDir, config.baseUrl))))
    .pipe(server.stream())
}

gulp.task('styles', ['images'], styles)
