import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import fancyLog from 'fancy-log'
import through2 from 'through2'

import config from '../../config'

export default function() {
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
