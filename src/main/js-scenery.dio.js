import Platform from './internal/platform/Platform'
import functionalComponent from './api/functionalComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOf from './api/isElementOf'
import isNode from './api/isNode'
import isElementsOf from './api/isElementsOf'
import connectContext from './api/connectContext'

import dio from 'dio.js'

Platform.createContext = dio.createContext
Platform.createElement = dio.createElement
Platform.isValidElement = dio.isValidElement
Platform.forwardRef = dio.forwardRef
Platform.Component = dio.Component
Platform.isContext = isContext

export {
  functionalComponent,
  classComponent,
  context,
  isElement,
  isElementOf,
  isNode,
  isElementsOf,
  connectContext
}

function isContext(it) {
  return !!it && typeof it === 'object'
    && dio.isValidElement(it.Provider)
    && dio.isValidElement(it.Consumer)
}