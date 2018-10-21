const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const gulp = require('gulp')
const through2 = require('through2')
const upath = require('upath')

const config = require(path.resolve('config'))

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: upath.join(config.srcDir, config.dir.static),
      since: gulp.lastRun(copy),
      dot: true,
      nodir: true
    })
    .pipe(through2.obj((file, encoding, cb) => {
      const destPath = upath.join(config.distDir, file.relative)

      fs.access(destPath, fs.constants.F_OK, error => {
        if (!error) {
          console.warn(chalk.yellow(
            `Warning: ${
              chalk.underline(upath.join(file.base, file.relative))
            } conflicts with ${chalk.underline(destPath)}`)
          )
          return cb()
        }

        return cb(null, file)
      })
    }))
    .pipe(gulp.dest(upath.join(config.distDir, config.baseDir)))
    .pipe(config.server.stream())
}

module.exports = copy
