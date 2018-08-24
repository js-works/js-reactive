import Platform from './internal/platform/Platform'
import funcComponent from './api/funcComponent'
import classComponent from './api/classComponent'
import context from './api/context'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'

import dio from 'dio.js'

Platform.createContext = dio.createContext
Platform.createElement = dio.createElement
Platform.isValidElement = dio.isValidElement
Platform.Component = dio.Component

export {
  funcComponent,
  classComponent,
  context,
  isElement,
  isElementOfType,
  isNode
}
