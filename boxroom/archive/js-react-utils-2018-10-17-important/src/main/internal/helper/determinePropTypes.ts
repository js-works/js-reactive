import validateProperties from '../validation/validateProperties'

import Props from '../types/Props'
import PropertiesConfig from '../types/PropertiesConfig'

type ReturnType<P extends Props> = { '*': (props: P) => null | Error }

function determinePropTypes<P extends Props>(
  propsConfig: PropertiesConfig<P>,
  propsValidator: (props: P) => null | Error | true | false,
  variableProps: boolean,
  componentName: string,
  isCtxProvider: boolean
): ReturnType<P> {
  let ret: ReturnType<P> = null

  ret = {
    '*': (props: P) => {
      return validateProperties(
        props, propsConfig, propsValidator, variableProps, componentName, isCtxProvider)
    }
  }

  return ret
}

export default determinePropTypes
