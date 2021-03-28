const path = require('path')

module.exports = {
  pathToRoot: (data) => path.posix.relative(data.page.url, '/') || '.',
}
