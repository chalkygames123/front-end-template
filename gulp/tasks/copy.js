const gulp = require('gulp')
const config = require('../config')
const $ = require('../global').plugins
const myServer = require('../global').myServer

const copy = () => {
	return gulp.src(config.copy.src.globs, config.copy.src.options)
		.pipe($.changed(config.paths.dest))
		.pipe(gulp.dest(config.paths.dest))
		.pipe($.if(config.watch, myServer.stream()))
}

gulp.task('copy', copy)
