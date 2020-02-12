const config = require('../../config')

module.exports = {
  siteName: 'Site Name',
  origin: 'https://example.com',
  ...config.getProperties()
}
