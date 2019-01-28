import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import fancyLog from 'fancy-log'
import through2 from 'through2'
import upath from 'upath'

import common from '../common'
import config from '../config'

export function detectConflict() {
  return through2.obj((file, encoding, cb) => {
    const conflictablePath = upath.normalize(
      `${config.srcDir}/${common.dir.static}/${file.relative}`
    )

    fs.access(conflictablePath, fs.constants.F_OK, error => {
      if (!error) {
        fancyLog.error(
          `${chalk.magenta(
            upath.normalize(path.relative('', file.history[0]))
          )} conflicts with ${chalk.magenta(conflictablePath)}`
        )

        return cb(new Error('A conflict detected.'))
      }

      cb(null, file)
    })
  })
}
