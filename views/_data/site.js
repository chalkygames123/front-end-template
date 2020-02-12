const config = require('../../config')

module.exports = {
  name: 'Site Name',
  origin: 'https://example.com',
  publicPath: config.get('publicPath')
}
