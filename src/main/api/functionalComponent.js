import validateFunctionalComponentConfig
  from './internal/validation/validateFunctionalComponentConfig'

export default function functionalComponent(config) {
  const error = validateFunctionalComponentConfig(config)

  if (error) {
    throw new Error(
      `[functionComponent] ${error.message}`)
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