import configSpec from '../spec/specOfFunctionComponentConfig'
import isValidDisplayName from '../helper/isValidDisplayName'
import FunctionComponentConfig from '../types/FunctionComponentConfig'

export default function validateComponentConfig(config: FunctionComponentConfig) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for function component'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += ` => ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}
