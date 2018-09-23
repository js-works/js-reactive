import Props from './Props'
import Injections from './Injections'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import React from 'react'

interface FunctionalComponentConfig<
  P extends Props = {},
  I extends Injections = {}
> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  inject?: { [propName in keyof I]: React.Context<I[propName]> },
  render: (props: P) => VirtualNode
}

export default FunctionalComponentConfig
