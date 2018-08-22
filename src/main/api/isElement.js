import Platform from '../internal/platform/Platform' 
import setJsSpecValidator from '../internal/helper/setJsSpecValidator'

export default function isElement(it) {
  return Platform.isValidElement(it)
}

setJsSpecValidator(isElement, it =>
  isElement(it)
    ? null
    : new Error('Must be a virtual element'))
