import validateFunctionalComponentConfig
  from '../internal/validation/validateFunctionalComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

export default function functionalComponent(config) {
  const error = validateFunctionalComponentConfig(config)

  if (error) {
    throw new Error(
      `[functionalComponent] ${error.message}`)
  }

  const
    ret = function () {
      return config.render.apply(null, arguments)
    },

    propTypes = determinePropTypes(config),
    defaultProps = determineDefaultProps(config)

  if (propTypes) {
    ret.propTypes = propTypes
  }

  if (defaultProps) {
    ret.defaultProps
  }

  ret.displayName = config.displayName
}
