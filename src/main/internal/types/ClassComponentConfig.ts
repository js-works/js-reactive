import Class from './Class'
import Props from './Props'
import Injections from './Injections'
import Methods from './Methods'
import PropertiesConfig from './PropertiesConfig'
import * as React from 'react'

interface ClassComponentConfig<
  P extends Props = {},
  I extends Injections = {},
  M extends Methods = {}
> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  inject?: { [propName in keyof I]: React.Context<I[propName]> },
  methods?: { [methodName in keyof M]: M[methodName] },
  main: Class<React.Component<P | I> & M>
}

export default ClassComponentConfig
