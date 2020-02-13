const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const through2 = require('through2')

const config = require('../../config')

module.exports = () => {
  return through2.obj((file, encoding, cb) => {
    const conflictablePath = path.relative(
      '',
      path.join(config.get('srcDir'), config.get('dir.static'), file.relative)
    )

    fs.promises
      .access(conflictablePath, fs.constants.F_OK)
      .then(() => {
        const inputPath = path.relative('', file.history[0])

        return cb(
          new Error(
            `${chalk.magenta(inputPath)} conflicts with ${chalk.magenta(
              conflictablePath
            )}`
          )
        )
      })
      .catch(() => cb(null, file))
  })
}
