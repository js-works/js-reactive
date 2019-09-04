import { createContext, Context } from 'react'
import { Spec } from 'js-spec'

import ContextConfig from '../internal/types/ContextConfig'

function context<T>(config: ContextConfig<T>): Context<T> {
  if (process.env.NODE_ENV === 'development' as any) {
    const error = validateContextConfig(config)

    if (error) {
      throw new TypeError(
        `[context] Invalid context configuration: ${error.message}`)
    }
  }

  return buildContext(config)
}

// --- locals -------------------------------------------------------

let validateContextConfig: (config: any) => null | Error

if (process.env.NODE_ENV === 'development' as any) {
  const REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/

  validateContextConfig =
    Spec.exact({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      defaultValue: Spec.optional(Spec.any),
      validate: Spec.optional(Spec.function)
    })
}

function buildContext<T>(config: ContextConfig<T>) { 
  const
    ret = createContext(config.defaultValue),
    provider: any = ret.Provider

  provider.displayName = config.displayName

  if (config.validate) {
    provider.propTypes = {
      value: (props: any) => {
        const
          result = config.validate(props.value),

          errorMsg =
            result === false
              ? 'Invalid value'
              : result instanceof Error
                ? result.message
                : null

        return !errorMsg
          ? null
          : new TypeError(
            'Validation error for provider of context '
            + `"${config.displayName}" => ${errorMsg}`)
      }
    }
  }

  return ret
}

// --- exports ------------------------------------------------------

export default context
