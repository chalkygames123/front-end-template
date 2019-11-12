import config from './config-schema'

// Uncomment the following line to list available configurations and the defaults
// console.log(config.getProperties())

config.load({})

config.validate({
  allowed: 'strict'
})

export default config
