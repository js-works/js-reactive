import configSpec from '../spec/specOfContextConfig'
import isValidDisplayName from '../helper/isValidDisplayName'

export default function validateConfigComponentConfig(config) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for context'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += `: ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}
