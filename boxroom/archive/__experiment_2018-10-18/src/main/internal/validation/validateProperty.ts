import Props from '../types/Props'
import PropertyConfig from '../types/PropertyConfig'

export default function validateProperty<P extends Props, K extends keyof P>(
  props: P,
  propConfig: PropertyConfig<K>,
  propName: K,
  componentName: string,
  isCtxProvider: boolean
) {
  let
    ret = null,
    errMsg = null

  const
    valueIsSet = props.hasOwnProperty(propName),
    value = valueIsSet ? props[propName] : undefined,
    nullable = propConfig.nullable === true,
    typeConstructor = propConfig.type || null,

    propInfo = `'${propName}' of `
      + `${isCtxProvider ? 'context provider for' : 'component'} '${componentName}'`
    
  let validate = propConfig.validate || null

  validate = validate && (<any>validate)['js-spec:validate'] || validate

  if (!valueIsSet) {
    if (!propConfig.hasOwnProperty('defaultValue') && propConfig.required === true) {
      errMsg = `Missing mandatory property ${propInfo}`
    }
  } else if (value === null && nullable === true || value === undefined && propConfig.required !== true) {
    // Perfectly fine
  } else if (value === null && nullable === false) {
    errMsg = `Property ${propInfo} must not be null`
  } else if (typeConstructor !== undefined && typeConstructor !== null) {
    const type = typeof value

    switch (<any>typeConstructor) {
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
        if (typeConstructor && !(<Function>value instanceof typeConstructor)) {
          errMsg = `The property ${propInfo} must be of type `
            + typeConstructor.name 
        }
    }
  }
  
  if (!errMsg && !(nullable && value === null)
    && valueIsSet && validate) {

    let err = (<Function>validate)(value)
      
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
