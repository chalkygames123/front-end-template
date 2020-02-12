const config = require('../../config')
const common = require('../common')

const isDev = config.get('mode') !== 'production'

module.exports = function templates() {
  return isDev ? common.eleventy.watch() : common.eleventy.write()
}
