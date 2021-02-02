// extenal imports
import React, { FunctionComponent } from 'react'

// internal imports
import setJsSpecValidator from '../internal/helpers/setJsSpecValidator'

// === exports =======================================================

export default isElementOfType

// === types =========================================================

type Type =
  | string
  | FunctionComponent<any>
  | (string | FunctionComponent<any>)[] // TODO? Classes?

// === isElementOfType ===============================================

function isElementOfType(type: Type, it: any): boolean
function isElementOfType(type: Type): (it: any) => boolean
function isElementOfType(type: Type, it?: any) {
  let ret = null

  const typeOfType = typeof type
  const typeIsString = typeOfType === 'string'
  const typeIsFunction = typeOfType === 'function'
  const typeIsArray = Array.isArray(type)

  if (!typeIsString && !typeIsFunction && !typeIsArray) {
    throw new TypeError(
      '[isElementOfType] First argument "type" must either be a string, a function or ' +
        'an array of string or functions'
    )
  }

  if (arguments.length > 1) {
    ret =
      React.isValidElement(it) &&
      (!typeIsArray ? it.type === type : (<any[]>type).indexOf(it.type) >= 0)
  } else {
    ret = (it: any) => isElementOfType(type, it)

    setJsSpecValidator(ret, (it: any) =>
      isElementOfType(type, it)
        ? null
        : new Error('Invalid type of React element')
    )
  }

  return ret
}
