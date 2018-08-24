import validateFuncComponentConfig
  from '../internal/validation/validateFuncComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

export default function funcComponent(config) {
  const error = validateFuncComponentConfig(config)

  if (error) {
    throw new Error(
      `[funcComponent] ${error.message}`)
  }

  const
    ret = function () {
      return config.render.apply(null, arguments)
    },

    defaultProps = determineDefaultProps(
      config.properties),
 
    propTypes = determinePropTypes(
      config.properties,
      config.validate,
      config.displayName,
      false)
  
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
