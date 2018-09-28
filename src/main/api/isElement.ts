import setJsSpecValidator from '../internal/helper/setJsSpecValidator'
import React from 'react'

export default function isElement(it: any) {
  return React.isValidElement(it)
}

setJsSpecValidator(isElement, (it: any) =>
  isElement(it)
    ? null
    : new Error('Must be a virtual element'))
