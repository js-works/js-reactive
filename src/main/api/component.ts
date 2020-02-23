import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import * as Spec from 'js-spec/validators'

import h from './h'
import Props from '../internal/types/Props'
import ComponentConfig from '../internal/types/ComponentConfig'

function component<P extends Props>
  (config: ComponentConfig<P>): ExtFunctionComponent<P>

function component<P extends Props = {}>(
  name: string,
  main?: ComponentConfig<P>['main'], // TODO
): ExtFunctionComponent<P>

function component<P extends Props = {}>(
  arg1: any, arg2?: any
): FunctionComponent<P> {
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
    ? buildComponent(arg1, arg2)
    : buildComponent(arg1.name, arg1.main, arg1.validate, arg1.memoize, arg1.forwardRef)
}

// --- locals -------------------------------------------------------

type ExtFunctionComponent<P extends Props> =
  FunctionComponent<P> & { create(props?: P, ...children: ReactNode[]): ReactElement<P> }

let validateComponentConfig: (config: any) => null | Error

if (process.env.NODE_ENV) {
  const REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/

  validateComponentConfig = Spec.exact({
    name: Spec.match(REGEX_DISPLAY_NAME),
    validate: Spec.optional(Spec.func),
    memoize: Spec.optional(Spec.boolean),
    forwardRef: Spec.optional(Spec.boolean),
    main: Spec.func
  })
}

function buildComponent<P extends Props>(
  name: string,
  main: (props: P) => ReactNode,
  validate?: (props: P) => boolean | null | Error,
  memoize?: boolean,
  forwardRef?: boolean
): FunctionComponent<P> & { create: (props?: P) => ReactElement<P> } { // TODO: props?
  let ret: any
  
  if (!forwardRef) {
    ret = (props: P) => {
      return main(props)
    }
  } else {
    ret = (props: P, ref: any) => {
      return main({ ...props, ref })
    }
  }

  if (forwardRef) {
    ret = React.forwardRef(ret)
  }

  ret.displayName = name

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
            + `"${name}" => ${errorMsg}`)
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
