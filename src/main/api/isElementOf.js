import Platform from '../internal/platform/Platform'
import setJsSpecValidator from '../internal/helper/setJsSpecValidator'

export default function isElementOf(type, it) {
  let ret = null

  const
    typeOfType = typeof type,
    typeIsFunction = typeOfType === 'function',
    typeIsArray = Array.isArray(type)

  if (!typeIsFunction && !typeIsArray) {
    throw new TypeError(
      '[isElementOf] First argument "type" must either be a function '
        + ' or an array of functions')
  }

  if (arguments.length > 1) {
    ret =
      typeof it === 'function'
        && Platform.isValidElement(it)
        && (typeIsFunction ? it.type === type : type.indexOf(it.type) >= 0)
  } else {
    ret = it => isElementOf(type, it)
  
    setJsSpecValidator(ret, it =>
      isElementOf(type, it)
        ? null
        : new Error('Invalid type of virtual element'))
  }

  return ret
}
