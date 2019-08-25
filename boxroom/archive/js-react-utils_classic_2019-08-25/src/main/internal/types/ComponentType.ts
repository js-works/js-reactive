import Props from './Props'
import React from 'react'

type ComponentType<P extends Props> = React.ComponentType<P>

export default ComponentType
