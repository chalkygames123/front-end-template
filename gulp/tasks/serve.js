const gulp = require('gulp')
const config = require('../config')
const myServer = require('../global').myServer

const serve = () => {
	return myServer.init(
		config.serve.browserSync
	)
}

gulp.task('serve', serve)
