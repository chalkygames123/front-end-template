const { series } = require('gulp')

const build = require('./build')
const serve = require('./serve')

module.exports = series(build, serve)
