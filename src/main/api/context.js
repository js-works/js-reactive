import Platform from '../internal/platform/Platform'

import validateContextConfig
  from '../internal/validation/validateContextConfig'

import determinePropTypes from '../internal/helper/determinePropTypes'

export default function context(config) {
  if (process.env.NODE_ENV === 'development') {
    const error = validateContextConfig(config)

    if (error) {
      throw new Error(`[context] ${error.message}`)
    }
  }

  const ret = Platform.createContext(config.defaultValue)

  if (process.env.NODE_ENV === 'development') {
    const
      hasType = !!config.type,
      hasConstraint = !!config.constraint,
      hasDefaultValue = config.hasOwnProperty('defaultValue')

    if (hasType || hasConstraint || !hasDefaultValue) {
      Object.defineProperty(ret.Provider, 'propTypes', {
        value: determinePropTypes(
          { value: config },
          null,
          config.displayName,
          true)
      })
    }
  }

  return ret
}
