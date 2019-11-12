export { default as build } from './tasks/build'
export { default as clean } from './tasks/clean'
export { default as copy } from './tasks/copy'
export { default as dev } from './tasks/dev'
export { default as images } from './tasks/images'
export { default as scripts } from './tasks/scripts'
export { default as serve, default } from './tasks/serve'
export { default as styles } from './tasks/styles'
export { default as templates } from './tasks/templates'
export { default as watch } from './tasks/watch'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
