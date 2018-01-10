'use strict';

const gulp = require('gulp');
const config = require('../config');
const $ = require('../global').plugins;
const myServer = require('../global').myServer;

const copy = () => {
	gulp.src(config.copy.src.globs, config.copy.src.options)
	.pipe($.if(config.watch, $.plumber({
		errorHandler: $.notify.onError("<%= error.message %>")
	})))
	.pipe($.changed(config.paths.dest))
	.pipe(gulp.dest(config.paths.dest))
	.pipe($.if(config.watch, myServer.stream()));
};

gulp.task('copy', copy);
