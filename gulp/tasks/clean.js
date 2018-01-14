const gulp = require('gulp')
const config = require('../config')
const del = require('del')

const clean = () => {
	return del(config.clean.del.patterns, config.clean.del.options)
}

gulp.task('clean', clean)
