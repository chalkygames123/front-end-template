const fs = require('fs')
const { Transform } = require('stream')

const ignore = require('ignore')

const ig = ignore().add(fs.readFileSync('.gitignore', 'utf8'))

module.exports = () =>
  new Transform({
    objectMode: true,
    transform(file, encoding, cb) {
      if (ig.ignores(file.relative)) {
        cb()
      } else {
        cb(null, file)
      }
    },
  })
