import { SYMBOL_ITERATOR } from '../internal/constant/constants'
import setJsSpecValidator from '../internal/helper/setJsSpecValidator'
import React from 'react'

export default function isNode(it: any) {
  const type = typeof it

  return it === undefined
    || it === null
    || (type !== 'object' && type !== 'symbol')
    || typeof it[SYMBOL_ITERATOR] === 'function'
    || React.isValidElement(it)
}

setJsSpecValidator(isNode, (it: any) =>
  isNode(it)
    ? null
    : new Error('Must be a virtual node'))
