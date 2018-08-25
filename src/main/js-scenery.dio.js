import Platform from './internal/platform/Platform'
import funcComponent from './api/funcComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'
import assignContext from './api/assignContext'

import dio from 'dio.js'

Platform.createContext = dio.createContext
Platform.createElement = dio.createElement
Platform.isValidElement = dio.isValidElement
Platform.forwardRef = dio.forwardRef
Platform.Component = dio.Component
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

function isContext(it) {
  return !!it && typeof it === 'object'
    && dio.isValidElement(it.Provider)
    && dio.isValidElement(it.Consumer)
}