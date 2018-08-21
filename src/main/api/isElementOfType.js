import Platform from '../internal/platform/Platform'
import setJsSpecValidator from '../internal/helper/setJsSpecValidator'

export default function isElementOfType(type, it) {
  let ret = null

  if (arguments.length > 1) {
    const types =
      type !== null && typeof type === 'object'
        && typeof type[Symbol.iterator] === 'function'
            ? (Array.isArray(type) ? type : Array.from(type))
            : null; 

    ret = Platform.isValidElement(it)
      && types === null && it.type === type
        || types !== null && types.indexOf(it.type) >= 0;
  } else {
    ret = (it = null) => isElementOfType(type, it);
  
    setJsSpecValidator(isElementOfType, it =>
      isElementOfType(it)
        ? null
        : new Error('Invalid type of virtual element'))
  }

  return ret;
}
