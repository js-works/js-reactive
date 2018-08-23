export default function determineDefaultProps(propsConfig) {
  let ret = null
  
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

            if (defaultValue !== undefined) {
              ret = ret || {}

              ret[propName] = defaultValue
            }
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
