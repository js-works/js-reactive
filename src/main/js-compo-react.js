import Platform from './internal/platform/Platform'
import functionalComponent from './api/functionalComponent'
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
  functionalComponent,
  classComponent,
  context,
  isElement,
  isElementOfType,
  isNode
}

export default Object.freeze({
  functionalComponent,
  classComponent,
  context,
  isElement,
  isElementOfType,
  isNode
})
