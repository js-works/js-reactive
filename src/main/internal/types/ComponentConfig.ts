import Class from './Class'
import Props from './Props'
import Methods from './Methods'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import React, { WeakValidationMap } from 'react'

type FullComponentConfig<
  P extends Props = {},
  M extends Methods = {}
> = {
  displayName: string,
  properties: PropertiesConfig<P>,
  propTypes?: never,
  defaultProps?: never,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  render: (props: P, ref?: any) => VirtualNode | Class<React.Component<P> & M>
}

type ShortComponentConfig<
  P extends Props = {},
  M extends Methods = {}
> = {
  displayName: string,
  propTypes?: WeakValidationMap<P>,
  defaultProps?: Partial<P>,
  properties?: never,
  variableProps?: never,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  render: (props: P, ref?: any) => VirtualNode | Class<React.Component<P, any> & M>
}


type ComponentConfig<P extends Props = {}, M extends Methods = {}> =
  FullComponentConfig<P, M> | ShortComponentConfig<P, M>

export default ComponentConfig
