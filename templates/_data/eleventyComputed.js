const path = require('path')

module.exports = {
  pathToRoot: (data) => path.relative(data.page.url, '/') || '.',
}
