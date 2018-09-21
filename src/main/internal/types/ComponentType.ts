import Props from './Props'
import * as React from 'react'

type ComponentType<P extends Props> = React.ComponentType<P>

export default ComponentType
