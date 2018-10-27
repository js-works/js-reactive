import setJsSpecValidation from '../helper/setJsSpecValidator'
import React from 'react'

function isContext(it: any) {
  return it !== null
    && typeof it === 'object'
    && !!it.Provider
    && !!it.Consumer
}

setJsSpecValidation(isContext, (it: any) => {
  let ret = null

  if (!isContext(it)) {
    ret = new Error('Must be a context')
  }

  return ret
})

export default isContext
