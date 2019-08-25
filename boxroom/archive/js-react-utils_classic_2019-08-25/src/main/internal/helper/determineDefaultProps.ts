import Props from '../types/Props'
import PropertiesConfig from '../types/PropertiesConfig'

export default function determineDefaultProps<P extends Props>(propsConfig: PropertiesConfig<P>) {
  let ret: Partial<Props> = null
  
  if (propsConfig) {
    for (const propName in propsConfig) {
      if (propsConfig.hasOwnProperty(propName)) {
        const
          propConfig = propsConfig[propName],
          defaultValueDescriptor =
            Object.getOwnPropertyDescriptor(propConfig, 'defaultValue'),
          hasDefaultValue = !!defaultValueDescriptor
        
        if (hasDefaultValue) {
          if (defaultValueDescriptor.hasOwnProperty('value')) {
            const defaultValue = propConfig.defaultValue

            ret = ret || {}
            ret[propName] = defaultValue
          } else {
            ret = ret || {}

            Object.defineProperty(ret, propName, {
              enumerable: true,
              get: defaultValueDescriptor.get
            })
          }
        }
      }
    }
  }

  return ret
}
