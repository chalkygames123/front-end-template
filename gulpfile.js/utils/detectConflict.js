const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')

const chalk = require('chalk')

const config = require('../../config')

module.exports = () => {
  return new Transform({
    objectMode: true,
    transform(file, encoding, cb) {
      const conflictablePath = path.relative(
        '',
        path.join(config.get('srcDir'), 'static', file.relative)
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
    },
  })
}
