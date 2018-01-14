const gulp = require('gulp')
const config = require('../config')
const $ = require('../global').plugins
const myServer = require('../global').myServer

const styles = () => {
	return gulp.src(config.styles.src.globs, config.styles.src.options)
		.pipe($.if(config.watch, $.plumber({
			errorHandler: $.notify.onError(error => {
				const options = {
					title: 'gulp styles - Error',
					message: error.message.replace($.ansiRegex(), ''),
					wait: true,
				}

				return options
			}),
		})))
		.pipe($.stylelint({
			reporters: [
				{
					failAfterError: true,
					formatter: 'string',
					console: true,
				},
			],
		}))
		.pipe($.if(!config.production, $.sourcemaps.init()))
		.pipe($.sassGlob())
		.pipe($.sass(config.styles.sass))
		.pipe($.postcss([
			$.autoprefixer(),
			$.cssMqpacker(),
			$.postcssAssets(config.styles.postcss.postcssAssets),
		]))
		.pipe($.if(config.production, $.cleanCss()))
		.pipe($.rename(path => {
			path.extname = '.css'
		}))
		.pipe($.if(!config.production, $.sourcemaps.write('maps')))
		.pipe(gulp.dest(config.paths.dest))
		.pipe($.if(config.watch, myServer.stream()))
}

gulp.task('styles', ['images'], styles)
