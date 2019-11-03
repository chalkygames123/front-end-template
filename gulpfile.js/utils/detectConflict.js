import fs from 'fs'

import chalk from 'chalk'
import fancyLog from 'fancy-log'
import through2 from 'through2'
import upath from 'upath'

import config from '../../config'

export default function() {
  return through2.obj((file, encoding, cb) => {
    const conflictablePath = upath.relative(
      '',
      upath.join(config.get('srcDir'), config.get('dir.static'), file.relative)
    )

    fs.promises
      .access(conflictablePath, fs.constants.F_OK)
      .then(() => {
        fancyLog.error(
          `${chalk.magenta(
            upath.relative('', file.history[0])
          )} conflicts with ${chalk.magenta(conflictablePath)}`
        )

        return cb(new Error('A conflict detected.'))
      })
      .catch(() => {
        return cb(null, file)
      })
  })
}
