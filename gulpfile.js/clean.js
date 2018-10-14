const path = require('path')

const del = require('del')

const config = require(path.resolve('config'))

function clean () {
  return del(config.distDir, {
    dot: true
  })
}

module.exports = clean
