import validateComponentConfig
  from '../internal/validation/validateComponentConfig'

import extendClass from '../internal/helper/extendClass'
import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

import Props from '../internal/types/Props'
import Methods from '../internal/types/Methods'
import ComponentType from '../internal/types/ComponentType'
import ClassComponentConfig from '../internal/types/ClassComponentConfig'
import FunctionComponentConfig from '../internal/types/FunctionComponentConfig'
import AdditionalAttributes from '../internal/types/AdditionalAttributes'

import React from 'react'

type Config<P extends Props> =
  FunctionComponentConfig<P>
    | ClassComponentConfig<P>

function defineComponent<
  P extends Props = {},
  M extends Methods = {}
>(config: FunctionComponentConfig<P, M>): ComponentType<P & AdditionalAttributes<M>>

function defineComponent<
  P extends Props = {},
  M extends Methods = {}
>(config: ClassComponentConfig<P, M>): ComponentType<P | AdditionalAttributes<M>>

function defineComponent<P extends Props>(config: Config<P>): ComponentType<P> {
  if (process.env.NODE_ENV === 'development' as any) {
    const error = validateComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  const
    main: any = config.main,
    isFunctionComponent = !(main.prototype instanceof React.Component),
    needsForwardRef = isFunctionComponent && (main.length > 1 || config.methods && config.methods.length > 0)

  let ret: ComponentType<P> = !isFunctionComponent
    ? extendClass(main)
    : needsForwardRef
    ? (props: P, ref: any) => main(props, ref)
    : (props: P) => main(props)

  Object.defineProperty(ret, 'displayName', { value: config.displayName })

  if (!isFunctionComponent) {
    Object.defineProperty(ret, 'contextTypes', { value: null })
    Object.defineProperty(ret, 'childContextTypes', { value: null })
  }

  let propTypes = null

  if (process.env.NODE_ENV === 'development' as any) {
    propTypes = determinePropTypes(
      config.properties,
      config.validate,
      !!config.variableProps,
      config.displayName,
      false)
  }
  
  if (needsForwardRef) {
    ret = React.forwardRef(ret)
  }

  Object.defineProperty(ret, 'propTypes', { value: propTypes })
  
  Object.defineProperty(ret, 'defaultProps', {
    value: determineDefaultProps(config.properties)
  }) 

  return ret
}

export default defineComponent
