import validateClassComponentConfig
  from '../internal/validation/validateClassComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

const evileval = eval // aliasing to suppress rollup warnings

let supportsClasses = false

try {
  evileval('void(class {})')
  supportsClasses = true
} catch (ignore) {
  // ignore error 
}

export default function classComponent(config) {
  const error = validateClassComponentConfig(config)

  if (error) {
    throw new Error(
      `[classComponent] ${error.message}`)
  }

  let ret
  
  const base = config.base
  
  if (supportsClasses) {
    ret = evileval('(class extends base {})')
  } else {
    ret = function () {
      base.apply(this, arguments)
    }

    ret.prototype = Object.create(base.prototype)
  }

  ret.displayName = config.displayName
  ret.defaultProps = determineDefaultProps(config),
  ret.propTypes = determinePropTypes(config)

  return ret
}
