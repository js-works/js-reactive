import setJsSpecValidator from '../internal/helper/setJsSpecValidator'
import isElementOf from './isElementOf'

export default function isElementsOf(type, it)  {
  let ret = false

  if (arguments.length > 1) {
    const types = type !== null && typeof type === 'object'
      && typeof type[Symbol.iterator] === 'function'
      ? (Array.isArray(type) ? type : Array.from(type))
      : null

    if (it !== null && typeof it === 'object' && typeof it[Symbol.iterator] === 'function') {
      const items = Array.isArray(it) ? it : Array.from(it)

      for (let i = 0; i < items.length; ++i) {
        if (!isElementsOf(types || type, items[i])) {
          ret = false
          break
        } else {
          ret = true
        }
      }
    } else {
      ret = isElementOf(type, it) 
    }
  } else {
    ret = it => isElementsOf(type, it) 
    
    setJsSpecValidator(ret, it =>
      isElementOf(type, it)
        ? null
        : new Error('Invalid children types'))
  }

  return ret
}
