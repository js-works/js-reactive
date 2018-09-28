import validateComponentConfig
  from '../internal/validation/validateComponentConfig'

import extendClass from '../internal/helper/extendClass'
import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'
import bindComponentToContext from '../internal/helper/bindComponentToContext'

import Props from '../internal/types/Props'
import Injections from '../internal/types/Injections'
import Methods from '../internal/types/Methods'
import ComponentType from '../internal/types/ComponentType'
import ClassComponentConfig from '../internal/types/ClassComponentConfig'
import FunctionalComponentConfig from '../internal/types/FunctionalComponentConfig'

import React from 'react'

type Config<P extends Props> =
  FunctionalComponentConfig<P>
    | ClassComponentConfig<P>

function defineComponent<
  P extends Props = {},
  I extends Injections = {}
>(config: FunctionalComponentConfig<P, I>): ComponentType<P>

function defineComponent<
  P extends Props = {},
  I extends Injections = {},
  M extends Methods = {}
>(config: ClassComponentConfig<P, I, M>): ComponentType<P>

function defineComponent<P extends Props>(config: Config<P>): ComponentType<P> {
  if (process.env.NODE_ENV === 'development') {
    const error = validateComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  const isFunctionalComponent = config.hasOwnProperty('render')

  let ret: ComponentType<P> = isFunctionalComponent
    ? (props: P) => (<any>config).render(props) // TODO
    : extendClass((<any>config).base) // TODO

  Object.defineProperty(ret, 'displayName', { value: config.displayName })

  if (!isFunctionalComponent) {
    Object.defineProperty(ret, 'contextTypes', { value: null })
    Object.defineProperty(ret, 'childContextTypes', { value: null })
  }

  if (config.inject) {
    Object.defineProperty(ret, 'propTypes', { value: null })
    Object.defineProperty(ret, 'defaultProps', { value: null })

    ret = bindComponentToContext(ret, config.inject, config.displayName)
  }

  let propTypes = null

  if (process.env.NODE_ENV === 'development') {
    propTypes = determinePropTypes(
      config.properties,
      config.validate,
      !!config.variableProps,
      config.displayName,
      false)
  }

  Object.defineProperty(ret, 'propTypes', { value: propTypes })
  
  Object.defineProperty(ret, 'defaultProps', {
    value: determineDefaultProps(config.properties)
  }) 

  return ret
}

export default defineComponent
