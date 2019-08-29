import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import { Spec } from 'js-spec'

import h from './h'
import Props from '../internal/types/Props'
import Methods from '../internal/types/Methods'
import ComponentConfig from '../internal/types/ComponentConfig'
import ComponentOptions from '../internal/types/ComponentOptions'

function component<P extends Props, M extends Methods = {}>
  (config: ComponentConfig<P>): ExtFunctionComponent<P>

function component<P extends Props = {}, M extends Methods = {}>(
  displayName: string,
  renderer?: FunctionComponent<P>,
  options?: ComponentOptions
): ExtFunctionComponent<P>

function component<P extends Props = {}, M extends Methods = {}>(
  arg1: any, arg2?: any, arg3?: any
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
    } else if (arguments.length > 2 && (!arg3 || typeof arg3 !== 'object')) {
      errorMsg = 'Expected an object as third argument'
    } else if (arg3) {
      const result = validateComponentOptions(arg3)

      if (result) {
        errorMsg = 'Invalid component options: ' + result.message
      }
    }

    if (errorMsg) {
      throw new Error(`[component] ${errorMsg}`)
    }
  }

  return typeof arg1 === 'string'
    ? buildComponent(arg1, arg2, arg2.validate)
    : buildComponent(arg1.displayName, arg2.defaultValue, arg2.validate)
}

// --- locals -------------------------------------------------------

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

type ExtProps<P extends Props> = Props & {
  ref?: any // TODO
}

type ExtFunctionComponent<P extends Props> =
  FunctionComponent<ExtProps<P>> & { create(props?: P, ...children: ReactNode[]): ReactElement<P> }

let
  validateComponentConfig: (config: any) => null | Error,
  validateComponentOptions: (options: any) => null | Error

if (process.env.NODE_ENV) {
  const REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/

  validateComponentConfig = Spec.exact({
    displayName: Spec.match(REGEX_DISPLAY_NAME),
    validate: Spec.optional(Spec.function),
    memoize: Spec.optional(Spec.boolean),
    render: Spec.function
  })

  validateComponentOptions = Spec.exact({
    validate: Spec.optional(Spec.function),
    memoize: Spec.optional(Spec.boolean),
  })
}

function buildComponent<P extends Props, M extends Methods = {}>(
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

// --- exports ------------------------------------------------------

export default component
