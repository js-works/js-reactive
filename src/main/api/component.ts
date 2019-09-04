import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { Spec } from 'js-spec'

import h from './h'
import Props from '../internal/types/Props'
import Methods from '../internal/types/Methods'
import ComponentConfig from '../internal/types/ComponentConfig'

function component<P extends Props, M extends Methods = {}>
  (config: ComponentConfig<P, M>): ExtFunctionComponent<P>

function component<P extends Props = {}, M extends Methods = {}>(
  displayName: string,
  renderer?: ComponentConfig<P, M>['render'], // TODO
): ExtFunctionComponent<P>

function component<P extends Props = {}, M extends Methods = {}>(
  arg1: any, arg2?: any
): ExtFunctionComponent<P> {
  let errorMsg: string

  if (process.env.NODE_ENV === 'development' as any) {
    if (arg1 && typeof arg1 === 'object') {
      if (arguments.length > 1) {
        errorMsg = 'Unexpected second argument'
      } else {
        const result = validateComponentConfig(arg1)

        if (result) {
          errorMsg = 'Invalid component configuration: ' + result.message
        }
      }
    } else if (typeof arg1 !== 'string') {
      errorMsg = 'Expected a string or an object as first argument'
    }

    if (errorMsg) {
      throw new Error(`[component] ${errorMsg}`)
    }
  }

  return typeof arg1 === 'string'
    ? buildComponent(arg1, arg2, arg2.validate, arg2.memoize)
    : buildComponent(arg1.displayName, arg1.render, arg1.validate, arg1.memoize)
}

// --- locals -------------------------------------------------------

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

type ExtProps<P extends Props> = Props & {
  ref?: any // TODO
}

type ExtFunctionComponent<P extends Props> =
  FunctionComponent<ExtProps<P>> & { create(props?: P, ...children: ReactNode[]): ReactElement<P> }

let validateComponentConfig: (config: any) => null | Error

if (process.env.NODE_ENV) {
  const REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/

  validateComponentConfig = Spec.exact({
    displayName: Spec.match(REGEX_DISPLAY_NAME),
    validate: Spec.optional(Spec.function),
    memoize: Spec.optional(Spec.boolean),
    render: Spec.function
  })
}

function buildComponent<P extends Props, M extends Methods = {}>(
  displayName: string,
  renderer: (props: P, ref?: ComponentRef<M>) => ReactNode,
  validate?: (props: P) => boolean | null | Error,
  memoize?: boolean
): FunctionComponent<P & { ref?: ComponentRef<M> }> & { create: (props?: P & { ref?: ComponentRef<M> }) => ReactElement<P> } { // TODO: props?
  let ret: any = (props: P, ref?: ComponentRef<M>) => {
    return renderer(props, ref)
  }

  if (renderer.length > 1) {
    ret = React.forwardRef(ret)
  }

  ret.displayName = displayName

  if (validate) {
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

  if (memoize === true) {
    ret = React.memo(ret)
  }

  ret.create = h.bind(null, ret)

  return ret
}

// --- exports ------------------------------------------------------

export default component
