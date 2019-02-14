import Class from './Class'
import Props from './Props'
import Methods from './Methods'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import React, { WeakValidationMap } from 'react'

type ComponentConfigAlt<
  P extends Props = {},
  M extends Methods = {}
> = {
  displayName: string,
  properties: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  render: (props: P, ref?: any) => VirtualNode | Class<React.Component<P> & M>
}

export default ComponentConfigAlt
