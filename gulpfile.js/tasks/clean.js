const fs = require('fs')

const config = require('../../config')

module.exports = function clean(cb) {
  fs.rm(
    config.get('distDir'),
    {
      force: true,
      recursive: true,
    },
    cb
  )
}
