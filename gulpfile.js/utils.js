const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const fancyLog = require('fancy-log')
const through2 = require('through2')
const upath = require('upath')

const config = require(path.resolve('config'))

module.exports.detectConflict = () => through2.obj((file, encoding, cb) => {
  const conflictablePath = upath.join(config.srcDir, config.dir.static, file.relative)

  fs.access(conflictablePath, fs.constants.F_OK, error => {
    if (!error) {
      fancyLog.error(`${
        chalk.magenta(path.relative('', file.history[0]))
      } conflicts with ${
        chalk.magenta(conflictablePath)
      }`)

      return cb(new Error('A conflict detected.'))
    }

    cb(null, file)
  })
})
