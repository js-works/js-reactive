import configSpec from '../spec/specOfFunctionalComponentConfig'
import isValidDisplayName from '../helper/isValidDisplayName'

export default function validateFunctionalComponentConfig(config) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for functional component'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += `: ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}