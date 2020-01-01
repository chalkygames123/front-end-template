const gulp = require('gulp')

const build = require('./build')
const serve = require('./serve')
const watch = require('./watch')

module.exports = gulp.series(build, gulp.parallel(serve, watch))
