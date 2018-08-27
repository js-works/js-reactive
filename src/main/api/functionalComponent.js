import validateFunctionalComponentConfig
  from '../internal/validation/validateFunctionalComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

export default function functionalComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  if (process.env.NODE_ENV === 'development') {
    const error = validateFunctionalComponentConfig(config)

    if (error) {
      throw new Error(
        `[functionalComponent] ${error.message}`)
    }
  }

  const
    ret = function () {
      return config.render.apply(null, arguments)
    },

    defaultProps = determineDefaultProps(
      config.properties)

  let propTypes = null

  if (process.env.NODE_ENV === 'development') {
    propTypes = determinePropTypes(
      config.properties,
      config.validate,
      config.displayName,
      false)
  }

  Object.defineProperty(ret, 'displayName', {
    value: config.displayName
  })

  if (defaultProps) {
    Object.defineProperty(ret, 'defaultProps', {
      value: defaultProps
    })
  }
  
  if (propTypes) {
    Object.defineProperty(ret, 'propTypes', {
      value: propTypes
    })
  }

  return ret
}
