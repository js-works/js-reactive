import validateProperty from './validateProperty'

export default function validateProperties(
  props, propsConfig, propsValidator, componentName, isCtxProvider) {
  let ret = null

  const
    propNames = propsConfig ? Object.keys(propsConfig) : [],
    messages = []

  if (propsConfig.properties) {
    for (let i = 0; i < propNames.length; ++i) {
      const
        propName = propNames[i],
        propValue = props[propName],
        propConfig = propsConfig[propName],
        ret = validateProperty(
          propValue, propName, propConfig, componentName, isCtxProvider)

      if (ret) {
        messages.push(ret.message)
      }
    }
  }

  const
    usedPropNames = Object.keys(props),
    invalidPropNames = []

  for (let i = 0; i < usedPropNames.length; ++i) {
    const usedPropName = usedPropNames[i]

    if (propsConfig && propsConfig.hasOwnProperty(usedPropName)) {
      if (usedPropName !== 'key' && usedPropName !=='ref') { // TODO: => DIO bug
        invalidPropNames.push(usedPropName)
      }
    }
  }

  if (invalidPropNames.length == 1) {
    messages.push(`Invalid prop key "${invalidPropNames[0]}"`)
  } else if (invalidPropNames.length > 1) {
    messages.push('Invalid prop keys: ' + invalidPropNames.join(', '))
  }

  if (propsValidator) {
    const error =
      typeof propsValidator === 'function'
        ? propsValidator(props)
        : propsValidator.validate(props)

    if (error) {
      messages.push(error instanceof Error ? error.message : String(error))
    }
  }

  if (messages.length === 1) {
    ret = new Error(messages[0])
  } else if (messages.length > 1) {
    ret = new Error(`\n- ${messages.join('\n- ')}`)
  }

  return ret
}
