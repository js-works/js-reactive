import React, { FunctionComponent, ReactElement, ReactNode, RefAttributes } from 'react'
import Props from './../internal/types/Props'
import Methods from './../internal/types/Methods'
import ComponentOptions from './../internal/types/ComponentOptions'
import h from './h'

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

export default function component<P extends Props, M extends Methods = {}>(
  displayName: string,
  renderer: (props: P, ref?: ComponentRef<M>) => ReactNode,
  options?: ComponentOptions
): FunctionComponent<P & { ref?: ComponentRef<M> }> & { create: (props?: P & { ref?: ComponentRef<M> }) => ReactElement<P> } { // TODO: props?
  let ret: any = (props: P, ref?: ComponentRef<M>) => {
    return renderer(props, ref)
  }

  if (renderer.length > 1) {
    ret = React.forwardRef(ret)
  }

  ret.displayName = displayName

  if (options && options.validate) {
    const validate = options.validate

    ret.propTypes = {
      '*'(props: any) {
        const
          result = validate(props),

          errorMsg =
            result === false
              ? 'Invalid value'
              : result instanceof Error
                ? result.message
                : null

        return !errorMsg
          ? null
          : new TypeError(
            'Props validation error for component '
            + `"${displayName}" => ${errorMsg}`)
      }
    }
  }

  if (options && options.memoize === true) {
    ret = React.memo(ret)
  }

  ret.create = h.bind(null, ret)

  return ret
}
