import configSpec from '../spec/specOfContextConfig'
import isValidDisplayName from '../helper/isValidDisplayName'
import ContextConfig from '../types/ContextConfig'

export default function validateContextConfig<T>(config: ContextConfig<T>) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for context'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += ` => ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}
