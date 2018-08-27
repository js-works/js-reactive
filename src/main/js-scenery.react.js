import Platform from './internal/platform/Platform'
import functionalComponent from './api/functionalComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'
import isElementsOfType from './api/isNode'
import connectToContext from './api/connectToContext'

import React from 'react'

Platform.createContext = React.createContext
Platform.createElement = React.createElement
Platform.isValidElement = React.isValidElement
Platform.forwardRef = React.forwardRef
Platform.Component = React.Component
Platform.isContext = isContext

export {
  functionalComponent,
  classComponent,
  context,
  isNode,
  isElement,
  isElementOfType,
  isElementsOfType,
  connectToContext
}

// --- locals -------------------------------------------------------

const
  contextSymbol = Symbol.for('react.context'),
  providerSymbol = Symbol.for('react.provider')

function isContext(it) {
  return it !== null
    && typeof it === 'object'
    && it.$$typeof === contextSymbol
    && it.Provider !== null
    && typeof it.Provider === 'object'
    && it.Provider.$$typeof === providerSymbol
    && it.Consumer === it
}
