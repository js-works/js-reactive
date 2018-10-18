import Props from './Props'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import React from 'react'

interface FunctionComponentConfig<P extends Props = {}> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  render: (props: P) => VirtualNode
}

export default FunctionComponentConfig
