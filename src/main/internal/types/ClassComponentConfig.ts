import Class from './Class'
import Props from './Props'
import Methods from './Methods'
import PropertiesConfig from './PropertiesConfig'
import React from 'react'

interface ClassComponentConfig<
  P extends Props = {},
  M extends Methods = {}
> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  methods?: (keyof M)[],
  main: Class<React.Component<P> & M>
}

export default ClassComponentConfig
