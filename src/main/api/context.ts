import { createContext, Context } from 'react'

import ContextOptions from '../internal/types/ContextOptions'

export default function context<T>(
  displayName: string,
  defaultValue?: T,
  options?: ContextOptions
) {
  const
    ret = createContext(defaultValue),
    provider: any = ret.Provider,
    validate = options ? options.validate : undefined

  provider.displayName = displayName

  if (validate) {
    provider.propTypes = {
      value: (props: any) => {
        const
          result = validate(props.value),

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
            + `"${displayName}" => ${errorMsg}`)
      }
    }
  }

  return ret
}
