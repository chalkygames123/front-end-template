const gulp = require('gulp')
const runSequence = require('run-sequence')

const development = done => {
	runSequence(
		'clean',
		['copy', 'html', 'images', 'styles'],
		'default',
		done
	)
}

gulp.task('development', development)
