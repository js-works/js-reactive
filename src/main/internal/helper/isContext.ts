import setJsSpecValidation from '../helper/setJsSpecValidator'
import * as React from 'react'

const
  exampleCtx: any = React.createContext(null),
  contextSymbol = exampleCtx.$$typeof,
  providerSymbol = exampleCtx.Provider.$$typeof

function isContext(it: any) {
  return it !== null
    && typeof it === 'object'
    && it.$$typeof === contextSymbol
    && it.Provider !== null
    && typeof it.Provider === 'object'
    && it.Provider.$$typeof === providerSymbol
    && it.Consumer === it
}

setJsSpecValidation(isContext, (it: any) => {
  let ret = null

  if (!isContext(it)) {
    ret = new Error('Must be a context')
  }

  return ret
})

export default isContext
