import { REGEX_DISPLAY_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

const configSpec =
  Spec.shape({
    displayName: Spec.match(REGEX_DISPLAY_NAME),
    validate: Spec.optional(Spec.function),
    render: Spec.function
  })

export function validateFunctionalComponentConfig(config) {
  const error = configSpec.validate(config)

  if (error) {
    throw new Error(
      `Invalid configuration for functional component: ${error.message}`)
  }

  const ret = function() {
    return config.render.apply(null, arguments)
  }

  ret.displayName = config.displayName

  const
    defaultProps = determineDefaultProps(config),
    propTypes = determinePropTypes(config)

  if (defaultProps) {
    ret.defaultProps = defaultProps
  }

  if (propTypes) {
    ret.propTypes = propTypes
  }

  return ret
}