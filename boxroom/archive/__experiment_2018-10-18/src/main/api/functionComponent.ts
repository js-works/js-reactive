import validateFunctionComponentConfig
  from '../internal/validation/validateFunctionComponentConfig'

import determineDefaultProps from '../internal/helper/determineDefaultProps'
import determinePropTypes from '../internal/helper/determinePropTypes'

import Props from '../internal/types/Props'
import ComponentType from '../internal/types/ComponentType'
import FunctionComponentConfig from '../internal/types/FunctionComponentConfig'

export default function classComponent<P extends Props = {}>(config: FunctionComponentConfig<P>): ComponentType<P> {
  if (process.env.NODE_ENV === 'development') {
    const error = validateFunctionComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  let ret: ComponentType<P> = (props: P) => (<any>config).render(props) // TODO

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

  return ret
}
