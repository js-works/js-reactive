import configSpec from '../spec/specOfClassComponentConfig'
import isValidDisplayName from '../helper/isValidDisplayName'

export default function validateClassComponentConfig(config) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for class component'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += `: ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}