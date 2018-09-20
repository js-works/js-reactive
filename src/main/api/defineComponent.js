import validateComponentConfig
  from '../internal/validation/validateComponentConfig'

import extendClass from '../internal/helper/extendClass'
import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'
import bindComponentToContext from '../internal/helper/bindComponentToContext'

export default function defineComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  if (process.env.NODE_ENV === 'development') {
    const error = validateComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  const isFunctionalComponent = config.hasOwnProperty('render')

  let ret =  isFunctionalComponent
    ? props => config.render(props)
    : extendClass(config.main)

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
      config.displayName,
      false)
  }

  Object.defineProperty(ret, 'propTypes', { value: propTypes })
  
  Object.defineProperty(ret, 'defaultProps', {
    value: determineDefaultProps(config.properties)
  }) 

  return ret
}
