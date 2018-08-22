export default function validateProperty(
  value, propConfig, propName, componentName, isContext) {
  
  let
    ret = null,
    errMsg = null

  const
    nullable = propConfig.nullable === true,
    typeConstructor = propConfig.type || null,
    constraint = propConfig.constraint || null,

    propInfo = `'${propName}' of `
      + `${isContext ? 'context' : 'component '} '${componentName}'`

  if (value === undefined) {
    if (!propConfig.hasOwnProperty('defaultValue')) {
      errMsg = `Missing mandatory property ${propInfo}`
    }
  } else if (value === null && nullable === true) {
    // Perfectly fine
  } else if (value === null && nullable === false) {
    errMsg = `Property ${propInfo} must not be null`
  } else if (typeConstructor !== undefined && typeConstructor !== null) {
    const type = typeof it

    switch (typeConstructor) {
      case Boolean:
        if (type !== 'boolean') {
          errMsg = `Property ${propInfo} must be boolean`
        }
        
        break
        
      case Number:
        if (type !== 'number') {
          errMsg = `Property ${propInfo} must be a number`
        }
        
        break
      
      case String:
        if (type !== 'string') {
          errMsg = `Property ${propInfo} must be a string`
        }
        
        break
        
      case Function:
        if (type !== 'function') {
          errMsg = `Property ${propInfo} must be a function`
        }
        
        break
        
      default:
        if (typeConstructor && !(value instanceof typeConstructor)) {
          errMsg = `The property ${propInfo} must be of type `
            + (typeConstructor.name || '<nameless>')
        }
    }
  }
  
  if (!errMsg && !(nullable && value === null) && constraint) {
    let err =
      typeof constraint === 'function' 
        ? constraint(value)
        : constraint.validate(value)
      
    if (err === undefined || err === null || err === true) {
      // everything fine
    } else if (err === false) {
      errMsg = `Invalid value for property ${propInfo}`
    } else if (typeof err === 'string') {
      errMsg = `Invalid value for property ${propInfo} => ${err}`
    } else if (err && typeof err.message === 'string') {
      errMsg = `Invalid value for property ${propInfo} => `
        + err.message
    } else {
      const msg = String(err).trim()

      errMsg = `Invalid value for property ${propInfo}`

      if (msg !== '') {
        errMsg += ` => ${msg}`
      }
    }
  }
  
  if (errMsg) {
    ret = new Error(errMsg)
  } 
  
  return ret
}
