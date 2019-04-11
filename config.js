import config from './config-schema'

config.load({})

config.validate({
  allowed: 'strict'
})

export default config
