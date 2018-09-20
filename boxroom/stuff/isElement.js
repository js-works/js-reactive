import Platform from '../../src/main/internal/platform/Platform' 
import setJsSpecValidator from '../../src/main/internal/helper/setJsSpecValidator'

export default function isElement(it) {
  return Platform.isValidElement(it)
}

setJsSpecValidator(isElement, it =>
  isElement(it)
    ? null
    : new Error('Must be a virtual element'))
