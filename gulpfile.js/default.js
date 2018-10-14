const gulp = require('gulp')

const serve = require('./serve')

module.exports = gulp.series(serve)
