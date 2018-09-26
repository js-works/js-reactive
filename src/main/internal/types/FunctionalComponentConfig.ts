import Props from './Props'
import Injections from './Injections'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import InjectionsConfig from './InjectionsConfig'
import React from 'react'

interface FunctionalComponentConfig<
  P extends Props = {},
  I extends Injections = {}
> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  inject?: InjectionsConfig<I>,
  render: (props: P) => VirtualNode
}

export default FunctionalComponentConfig
