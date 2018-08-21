import Platform from 'internal/platform/Platform'

import validateContextConfig
  from './internal/validation/validateContextConfig'

export default function context(config) {
  const error = validateContextConfig(config)

  if (error) {
    throw new Error(`[context] ${error.message}`)
  }

  const
    ret = Platform.createContext(config.defaultValue),
    hasType = !!config.type,
    hasConstraint = !!config.constraint,
    hasDefaultValue = config.hasOwnProperty('defaultValue')

  if (hasType || hasConstraint || !hasDefaultValue) {
    ret.Provider.propTypes = determinePropTypes({ value: config })
  }

  return ret
}
