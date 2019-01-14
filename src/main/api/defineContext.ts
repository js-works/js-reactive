import React from 'react'
import isNode from './isNode'

import validateContextConfig
  from '../internal/validation/validateContextConfig'

import Context from '../internal/types/Context'
import ContextConfig from '../internal/types/ContextConfig'

import determinePropTypes from '../internal/helper/determinePropTypes'

export default function defineContext<T>(config: ContextConfig<T>) {
  if (process.env.NODE_ENV === 'development' as any) {
    const error = validateContextConfig(config)

    if (error) {
      throw new Error(`[context] ${error.message}`)
    }
  }

  const ret = React.createContext(config.defaultValue)

  if (process.env.NODE_ENV === 'development' as any) {
    const
      hasType = !!config.type,
      hasConstraint = !!config.validate,
      hasDefaultValue = config.hasOwnProperty('defaultValue')

    if (hasType || hasConstraint || !hasDefaultValue) {
      Object.defineProperty(ret.Provider, 'propTypes', {
        value: determinePropTypes(
          <any>{ value: config, children: { validate: isNode } },
          null,
          false,
          config.displayName,
          true)
      })
    }
  }

  return ret
}
