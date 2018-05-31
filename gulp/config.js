const paths = {
  src: 'src',
  dest: 'public',
  root: ''
}

const clean = {
  del: {
    patterns: `${paths.dest}/*`,
    options: {
      dot: true
    }
  }
}

const html = {
  src: {
    globs: `${paths.src}/**/*.ejs`,
    options: {
      base: paths.src
    }
  },
  ejs: {
    data: {
      // example: require(require('path').resolve(`${paths.src}${paths.root}/data/example.json`))
    },
    options: {
      root: `${paths.src}${paths.root}`
    },
    settings: {
      ext: '.html'
    }
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
    sortClassName: true
  },
  filter: {
    pattern: '**/!(_)*.ejs'
  }
}

const images = {
  src: {
    globs: `${paths.src}${paths.root}/assets/images/**/*.+(gif|jpg|png|svg)`,
    options: {
      base: paths.src
    }
  },
  imagemin: {
    gifsicle: {
      optimizationLevel: 3
    },
    jpegtran: {
      progressive: true
    },
    svgo: {}
  },
  imageminPngquant: {
    quality: '80-90',
    speed: 1
  },
  imageminWebp: {
    quality: '90',
    method: 6
  },
  webpFilter: {
    pattern: '**/*.+(jpg|png)'
  }
}

const scripts = {
  src: {
    globs: `${paths.src}${paths.root}/assets/scripts/**/!(_)*.js`,
    options: {
      base: paths.src
    }
  }
}

const serve = {
  browserSync: {
    ui: false,
    server: paths.dest,
    startPath: paths.root
  }
}

const styles = {
  src: {
    globs: `${paths.src}${paths.root}/assets/styles/**/*.scss`,
    options: {
      base: paths.src
    }
  },
  sourcemaps: {
    init: {
      loadMaps: true
    }
  },
  sass: {
    importer: require('node-sass-magic-importer')(),
    includePaths: `${paths.src}${paths.root}/assets/styles`,
    outputStyle: 'compressed'
  },
  cleanCss: {
    rebase: false
  }
}

function negatePattern (globs) {
  if (Array.isArray(globs)) {
    return globs.map(el => `!${el}`)
  }

  return [`!${globs}`]
}

const copy = {
  src: {
    globs: [
      `${paths.src}/**/!(_)*`,
      ...negatePattern(html.src.globs),
      ...negatePattern(images.src.globs),
      ...negatePattern(styles.src.globs),
      ...negatePattern(scripts.src.globs),
      '!**/.gitkeep'
    ],
    options: {
      base: paths.src,
      dot: true,
      nodir: true
    }
  }
}

const mode = process.env.NODE_ENV || 'production'

const program = require('commander')

program
  .option('-w, --watch')
  .parse(process.argv)

const server = require('browser-sync').create()

module.exports = {
  paths,
  clean,
  copy,
  html,
  images,
  scripts,
  serve,
  styles,
  env: {
    DEVELOPMENT: mode === 'development',
    PRODUCTION: mode === 'production'
  },
  watch: program.watch,
  server
}
