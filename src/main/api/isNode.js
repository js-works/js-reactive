import Platform from '../internal/platform/Platform'
import { SYMBOL_ITERATOR } from '../internal/constant/constants'
import setJsSpecValidator from '../internal/helper/setJsSpecValidator'

export default function isNode(it) {
  const type = typeof it

  return it === undefined
    || it === null
    || (type !== 'object' && type !== 'symbol')
    || typeof it[SYMBOL_ITERATOR] === 'function'
    || Platform.isValidElement(it);
}

setJsSpecValidator(isNode, it =>
  isNode(it)
    ? null
    : new Error('Must be a virtual node'))
