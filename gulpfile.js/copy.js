const fs = require('fs')
const path = require('path')

const $ = require('gulp-load-plugins')()
const chalk = require('chalk')
const gulp = require('gulp')
const stripAnsi = require('strip-ansi')
const through2 = require('through2')
const upath = require('upath')

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: upath.join(config.srcDir, config.dir.static),
      since: gulp.lastRun(copy),
      dot: true,
      nodir: true
    })
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe(through2.obj((file, encoding, cb) => {
      const destPath = upath.join(config.distDir, file.relative)

      fs.access(destPath, fs.constants.F_OK, error => {
        if (!error) {
          const errorMessage = chalk.red(
            `${
              chalk.underline(upath.join(file.base, file.relative))
            } conflicts with ${
              chalk.underline(destPath)
            }`
          )

          console.error(errorMessage)

          return cb(new Error(stripAnsi(errorMessage)))
        }

        return cb(null, file)
      })
    }))
    .pipe(gulp.dest(upath.join(config.distDir, config.baseDir)))
    .pipe(config.server.stream())
}

module.exports = copy
