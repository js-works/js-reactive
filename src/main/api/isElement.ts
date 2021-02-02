// external imports
import React from 'react'

// internal imports
import setJsSpecValidator from '../internal/helpers/setJsSpecValidator'

// === exports =======================================================

export default isElement

// === isElement =====================================================

function isElement(it: any) {
  return React.isValidElement(it)
}

setJsSpecValidator(isElement, (it: any) =>
  isElement(it) ? null : new Error('Must be a React element')
)
