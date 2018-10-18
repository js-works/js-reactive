import Class from './Class'
import Props from './Props'
import PropertiesConfig from './PropertiesConfig'
import React from 'react'

interface ClassComponentConfig<P extends Props , C extends React.Component<P>> {
  displayName: string,
  properties?: PropertiesConfig<P>,
  variableProps?: boolean,
  validate?: (props: P) => null | Error | true | false,
  base: { new(props: P): C }
}

export default ClassComponentConfig
