import Platform from './internal/platform/Platform'
import defineComponent from './api/defineComponent'
import defineContext from './api/defineContext'
import fromChildren from './api/fromChildren'
import withChildren from './api/withChildren'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'

import React from 'react'

Platform.createContext = React.createContext
Platform.createElement = React.createElement
Platform.isValidElement = React.isValidElement
Platform.forwardRef = React.forwardRef
Platform.Component = React.Component
Platform.Children = React.Children

export {
  defineComponent,
  defineContext,
  fromChildren,
  withChildren,
  isNode,
  isElementOfType
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