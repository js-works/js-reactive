import Platform from './internal/platform/Platform'
import defineComponent from './api/defineComponent'
import defineContext from './api/defineContext'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'
import isElementsOfType from './api/isNode'

import React from 'react'

Platform.createContext = React.createContext
Platform.createElement = React.createElement
Platform.isValidElement = React.isValidElement
Platform.forwardRef = React.forwardRef
Platform.Component = React.Component

export {
  defineComponent,
  defineContext,
  isNode,
  isElement,
  isElementOfType,
  isElementsOfType
}

/*
function isContext(it) {
  return it !== null
    && typeof it === 'object'
    && it.$$typeof === contextSymbol
    && it.Provider !== null
    && typeof it.Provider === 'object'
    && it.Provider.$$typeof === providerSymbol
    && it.Consumer === it
}
*/