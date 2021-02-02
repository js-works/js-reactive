// internal imports
import setJsSpecValidator from '../internal/helpers/setJsSpecValidator'

// === exports =======================================================

export default isRef

// === isRef =========================================================

function isRef(it: any) {
  return typeof it === 'function' || (it && 'current' in it)
}

setJsSpecValidator(isRef, (it: any) =>
  isRef(it) ? null : new Error('Must be a ref')
)
