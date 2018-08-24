import Platform from './internal/platform/Platform'
import funcComponent from './api/funcComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'

import React from 'react'

Platform.createContext = React.createContext
Platform.createElement = React.createElement
Platform.isValidElement = React.isValidElement
Platform.Component = React.Component

export {
  funcComponent,
  classComponent,
  context,
  isElement,
  isElementOfType,
  isNode
}
