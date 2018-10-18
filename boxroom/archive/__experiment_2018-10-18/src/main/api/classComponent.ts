import validateClassComponentConfig
  from '../internal/validation/validateClassComponentConfig'

import extendClass from '../internal/helper/extendClass'
import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

import Props from '../internal/types/Props'
import Class from '../internal/types/Class'
import ComponentType from '../internal/types/ComponentType'
import ClassComponentConfig from '../internal/types/ClassComponentConfig'

export default function classComponent<P extends Props, C extends React.Component<P, any, any>>(
  config: ClassComponentConfig<P, C> 
): { new(props: P): C } {
  if (process.env.NODE_ENV === 'development') {
    const error = validateClassComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  let ret: React.Component<P> = <any>extendClass((<any>config).base) // TODO

  Object.defineProperty(ret, 'displayName', { value: config.displayName })
  Object.defineProperty(ret, 'contextTypes', { value: null })
  Object.defineProperty(ret, 'childContextTypes', { value: null })

  let propTypes = null

  if (process.env.NODE_ENV === 'development') {
    propTypes = determinePropTypes(
      config.properties,
      config.validate,
      !!config.variableProps,
      config.displayName,
      false)
  }

  Object.defineProperty(ret, 'propTypes', { value: propTypes })
  
  Object.defineProperty(ret, 'defaultProps', {
    value: determineDefaultProps(config.properties)
  }) 

  return ret as any// TODO
}
