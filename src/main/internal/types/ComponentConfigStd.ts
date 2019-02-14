import Class from './Class'
import Props from './Props'
import Methods from './Methods'
import VirtualNode from './VirtualNode'
import React, { WeakValidationMap } from 'react'

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

type ComponentConfigStd<
  P extends Props = {},
  M extends Methods = {}
> = {
  displayName: string,
  propTypes?: WeakValidationMap<P>,
  defaultProps?: Partial<P>,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  render: (props: P, ref?: ComponentRef<M>) => VirtualNode | Class<React.Component<P, any> & M>
}

export default ComponentConfigStd
