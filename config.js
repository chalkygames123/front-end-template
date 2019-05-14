import { config } from './config-schema'

export { config }

config.load({})

config.validate({
  allowed: 'strict'
})
