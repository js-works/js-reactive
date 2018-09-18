import Platform from './internal/platform/Platform'
import defineComponent from './api/defineComponent'
import defineContext from './api/defineContext'
import isElement from './api/isElement'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'
import isElementsOfType from './api/isElementsOfType'

import dio from 'dio.js'

Platform.createContext = dio.createContext
Platform.createElement = dio.createElement
Platform.isValidElement = dio.isValidElement
Platform.forwardRef = dio.forwardRef
Platform.Component = dio.Component
Platform.isContext = isContext

export {
  defineComponent,
  defineContext,
  isNode,
  isElement,
  isElementOfType,
  isElementsOfType
}

function isContext(it) {
  return !!it && typeof it === 'object'
    && dio.isValidElement(it.Provider)
    && dio.isValidElement(it.Consumer)
}