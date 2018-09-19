const paths = {
  srcDir: 'src',
  baseUrl: '/',
  outputDir: 'public',
  assetsDir: 'assets'
}

const clean = {
  del: {
    patterns: paths.outputDir,
    options: {
      dot: true
    }
  }
}

const copy = {
  src: {
    globs: [
      `${paths.srcDir}/static/**`,
      '!**/.gitkeep'
    ],
    options: {
      base: `${paths.srcDir}/static`,
      dot: true,
      nodir: true
    }
  }
}

const html = {
  src: {
    globs: `${paths.srcDir}/pages/**/*.ejs`,
    options: {
      base: `${paths.srcDir}/pages`
    }
  },
  ejs: {
    options: {
      root: `${paths.srcDir}/pages`
    },
    settings: {
      ext: '.html'
    }
  },
  htmlmin: {
    caseSensitive: true,
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
    removeStyleLinkTypeAttributes: true
  },
  filter: {
    pattern: '**/!(_)*.ejs'
  }
}

const images = {
  src: {
    globs: `${paths.srcDir}/${paths.assetsDir}/**/*.+(png|jp?(e)g|gif|svg)`,
    options: {
      base: paths.srcDir
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
    pattern: '**/*.+(png|jp?(e)g)'
  }
}

const scripts = {
  src: {
    globs: `${paths.srcDir}/${paths.assetsDir}/scripts/**/*.js`,
    options: {
      base: paths.srcDir
    }
  },
  filter: {
    pattern: '**/!(_)*.js'
  }
}

const serve = {
  browserSync: {
    ui: false,
    server: paths.outputDir,
    startPath: paths.baseUrl
  }
}

const server = require('browser-sync').create()

const styles = {
  src: {
    globs: `${paths.srcDir}/${paths.assetsDir}/styles/**/*.scss`,
    options: {
      base: paths.srcDir
    }
  },
  sass: {
    importer: require('node-sass-magic-importer')(),
    includePaths: `${paths.srcDir}/${paths.assetsDir}/styles`,
    outputStyle: 'compressed'
  },
  cleanCss: {
    rebase: false
  }
}

const env = process.env.NODE_ENV || 'production'

module.exports = {
  paths,
  clean,
  copy,
  html,
  images,
  scripts,
  serve,
  server,
  styles,
  env: {
    DEVELOPMENT: env === 'development',
    PRODUCTION: env === 'production'
  }
}
