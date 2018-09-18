import validateComponentConfig
  from '../internal/validation/validateComponentConfig'

import defineFunctionalComponent
  from '../internal/component/defineFunctionalComponent'

import defineClassComponent
  from '../internal/component/defineClassComponent'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'
import bindComponentToContext from '../internal/component/bindComponentToContext'

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

  let ret = config.render
    ? defineFunctionalComponent(config)
    : defineClassComponent(config)

  if (config.inject) {
    delete ret.propTypes

    ret = bindComponentToContext(ret, config.inject)
  }

  if (process.env.NODE_ENV === 'development') {
    ret.propTypes = determinePropTypes(
      config.properties,
      config.validate,
      config.displayName,
      false)
  } else {
    ret.propTypes = null
  }

  ret.defaultProps = determineDefaultProps(
    config.properties)

  return ret
}
