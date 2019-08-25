import setJsSpecValidator from '../internal/helper/setJsSpecValidator'

export default function isRef(it: any) {
  return  typeof it === 'function' || it && it.hasOwnProperty('current')
}

setJsSpecValidator(isRef, (it: any) =>
  isRef(it)
    ? null
    : new Error('Must be a ref'))
