const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')

const build = done => {
	runSequence(
		'clean',
		['copy', 'html', 'images', 'styles', config.watch ? null : 'scripts'],
		done
	)
}

gulp.task('build', build)
