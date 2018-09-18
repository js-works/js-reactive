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

// --- locals -------------------------------------------------------

function defineFunctionalComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  const
    ret = function () {
      return config.render.apply(null, arguments)
    }


  Object.defineProperty(ret, 'displayName', {
    value: config.displayName
  })

  return ret
}

function defineClassComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  const
    ret = extendClass(config.main),
    displayName = config.displayName

  Object.defineProperties(ret, {
    displayName: {
      value: displayName
    },

    contextTypes: {
      value: null
    },

    childContextTypes: {
      value: null
    }
  })

  return ret
}
