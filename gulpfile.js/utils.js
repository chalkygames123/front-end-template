const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const stripAnsi = require('strip-ansi')
const through2 = require('through2')
const upath = require('upath')

const config = require(path.resolve('config'))

module.exports.detectConflict = through2.ctor({
  objectMode: true
}, (file, encoding, cb) => {
  const conflictablePath = upath.join(config.srcDir, config.dir.static, file.relative)

  fs.access(conflictablePath, fs.constants.F_OK, error => {
    if (!error) {
      const errorMessage = chalk.red(
        `${
          chalk.underline(path.relative('', file.history[0]))
        } conflicts with ${
          chalk.underline(conflictablePath)
        }`
      )

      console.error(errorMessage)

      return cb(new Error(stripAnsi(errorMessage)))
    }

    return cb(null, file)
  })
})
