import configSpec from '../spec/specOfCtxAssignmentsConfig'
import isValidDisplayName from '../helper/isValidDisplayName'

export default function validateCtxAssignmentsConfig(config, componentName) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for context assigments'

    if (isValidDisplayName(componentName)) {
      errorMsg += ` "${componentName}"`
    }

    errorMsg += ` => ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}
