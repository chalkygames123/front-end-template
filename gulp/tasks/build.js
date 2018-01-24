const gulp = require('gulp')
const runSequence = require('run-sequence')

const build = done => {
	runSequence(
		'clean',
		['copy', 'html', 'images', 'styles', 'scripts'],
		done
	)
}

gulp.task('build', build)
