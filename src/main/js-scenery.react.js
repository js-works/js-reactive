import Platform from './internal/platform/Platform'
import funcComponent from './api/funcComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'
import assignContext from './api/assignContext'

import React from 'react'

Platform.createContext = React.createContext
Platform.createElement = React.createElement
Platform.isValidElement = React.isValidElement
Platform.forwardRef = React.forwardRef
Platform.Component = React.Component
Platform.isContext = isContext

export {
  funcComponent,
  classComponent,
  context,
  isElement,
  isElementOfType,
  isNode,
  assignContext
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
