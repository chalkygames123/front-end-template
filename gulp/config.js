const paths = {
	src: './src',
	dest: './public',
}

const clean = {
	del: {
		patterns: [
			paths.dest + '/**/*',
		],
		options: {
			dot: true,
		},
	},
}

const html = {
	src: {
		globs: [
			paths.src + '/**/*.ejs',
		],
		options: {
			base: 'src',
		},
	},
	ejs: {
		data: null,
		options: null,
		settings: {
			ext: '.html',
		},
	},
	htmlmin: {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJs: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		sortAttributes: true,
		sortClassName: true,
	},
	filter: {
		pattern: [
			'**/!(_)*.ejs',
		],
	},
}

const images = {
	src: {
		globs: [
			paths.src + '/assets/images/**/*.+(gif|jpg|png|svg)',
		],
		options: {
			base: 'src',
		},
	},
	webpSrc: {
		globs: [
			paths.src + '/assets/images/**/*.+(jpg|png)',
		],
		options: {
			base: 'src',
		},
	},
	imagemin: {
		gifsicle: {
			optimizationLevel: 3,
		},
		jpegtran: {
			progressive: true,
		},
		svgo: {},
	},
	imageminPngquant: {
		quality: '80-90',
		speed: 1,
	},
	imageminWebp: {
		quality: '90',
		method: 6,
	},
}

const scripts = {
	src: {
		globs: [
			paths.src + '/assets/scripts/**/!(_)*.js',
		],
		options: {
			base: 'src',
		},
	},
}

const serve = {
	browserSync: {
		ui: false,
		server: paths.dest,
	},
}

const styles = {
	src: {
		globs: [
			paths.src + '/assets/styles/**/*.scss',
		],
		options: {
			base: 'src',
		},
	},
	sass: {
		includePaths: [
			'./node_modules/ress',
		],
		outputStyle: 'expanded',
	},
	postcss: {
		postcssAssets: {
			basePath: paths.dest,
		},
	},
}

const copy = {
	src: {
		globs: [
			paths.src + '/**/!(_)*',
			'!' + html.src.globs,
			'!' + images.src.globs,
			'!' + styles.src.globs,
			'!' + scripts.src.globs,
			'!**/.gitkeep',
		],
		options: {
			base: 'src',
			dot: true,
			nodir: true,
		},
	},
}

module.exports = {
	paths,
	clean,
	copy,
	html,
	images,
	scripts,
	serve,
	styles,
	production: process.env.NODE_ENV === 'production',
	watch: process.env.NODE_ENV === 'watch',
}
