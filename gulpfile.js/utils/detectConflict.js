const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const fancyLog = require('fancy-log')
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
        fancyLog.error(
          `${chalk.red(
            `Error: The following files are conflicted: ${chalk.magenta(
              `${path.relative('', file.history[0])}, ${conflictablePath}`
            )}`
          )}`
        )

        return cb(new Error('Conflict detected.'))
      })
      .catch(() => cb(null, file))
  })
}
