const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const imageminPngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')
const server = require('./serve').server

const src = `${config.srcDir}/${config.assetsDir}/**/*.+(png|jp?(e)g|gif|svg)`

module.exports = { src }

const images = () => {
  return gulp
    .src(src, {
      base: config.srcDir
    })
    .pipe($.changed(`${config.outputDir}${config.baseUrl}`))
    .pipe($.if(!config.isDev, $.imagemin([
      $.imagemin.gifsicle({
        optimizationLevel: 3
      }),
      $.imagemin.jpegtran({
        progressive: true
      }),
      $.imagemin.svgo(),
      imageminPngquant({
        quality: '80-90',
        speed: 1
      })
    ])))
    .pipe(gulp.dest(`${config.outputDir}${config.baseUrl}`))
    .pipe($.filter('**/*.+(png|jp?(e)g)'))
    .pipe($.if(!config.isDev, $.imagemin([
      imageminWebp({
        quality: '90',
        method: 6
      })
    ])))
    .pipe($.rename({
      extname: '.webp'
    }))
    .pipe(gulp.dest(`${config.outputDir}${config.baseUrl}`))
    .pipe(server.stream())
}

gulp.task('images', images)
