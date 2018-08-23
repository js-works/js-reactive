import validateClassComponentConfig
  from '../internal/validation/validateClassComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'
import extendClass from '../internal/helper/extendClass'

export default function classComponent(config) {
  const error = validateClassComponentConfig(config)

  if (error) {
    throw new Error(
      `[classComponent] ${error.message}`)
  }

  let ret = extendClass(config.base)
  ret.displayName = config.displayName
  ret.defaultProps = determineDefaultProps(config),
  ret.propTypes = determinePropTypes(config)

  return ret
}
