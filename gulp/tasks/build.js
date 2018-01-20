const gulp = require('gulp')
const config = require('../config')
const runSequence = require('run-sequence')

const defaultTasks = ['copy', 'html', 'images', 'styles', 'scripts']
const watchTasks = ['copy', 'html', 'images', 'styles']

const build = done => {
	runSequence(
		'clean',
		config.watch ? watchTasks : defaultTasks,
		done
	)
}

gulp.task('build', build)
