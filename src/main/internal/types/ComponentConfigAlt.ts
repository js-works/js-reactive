import Class from './Class'
import Props from './Props'
import Methods from './Methods'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import React, { WeakValidationMap } from 'react'

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

type ComponentConfigAlt<
  P extends Props = {},
  M extends Methods = {}
> = {
  displayName: string,
  properties: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  render: (props: P, ref?: ComponentRef<M>) => VirtualNode | Class<React.Component<P> & M>
}

export default ComponentConfigAlt
