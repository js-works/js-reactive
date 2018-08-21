export default function determineDefaultProps(config) {
  let ret = null
  const properties = config.properties
  
  if (properties) {
    for (const propName in properties) {
      if (properties.hasOwnProperty(propName)) {
        const
          propConfig = properties[propName],
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
