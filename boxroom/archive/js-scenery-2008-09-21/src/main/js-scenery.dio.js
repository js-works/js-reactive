import Platform from './internal/platform/Platform'
import defineComponent from './api/defineComponent'
import defineContext from './api/defineContext'
import fromChildren from './api/fromChildren'
import withChildren from './api/withChildren'
import isElementOfType from './api/isElementOfType'
import isNode from './api/isNode'

import dio from 'dio.js'

Platform.createContext = dio.createContext
Platform.createElement = dio.createElement
Platform.isValidElement = dio.isValidElement
Platform.forwardRef = dio.forwardRef
Platform.Component = dio.Component
Platform.Chldren = dio.Children

export {
  defineComponent,
  defineContext,
  fromChildren,
  withChildren,
  isNode,
  isElementOfType
}
