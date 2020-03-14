const gulp = require('gulp')

const build = require('./build')
const serve = require('./serve')

module.exports = gulp.series(build, serve)
