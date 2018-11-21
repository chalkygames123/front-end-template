const del = require('del')

const config = require('../config')

function clean () {
  return del(config.distDir, {
    dot: true
  })
}

module.exports = clean
