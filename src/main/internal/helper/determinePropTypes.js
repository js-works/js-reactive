import validateProperties from '../validation/validateProperties'

export default function determinePropTypes(
  propsConfig, propsValidator, componentName) {

  let ret = null
  
  if (propsConfig) {
    for (const propName in propsConfig) {
      if (propsConfig.hasOwnProperty(propName)) {
        ret = {
          '*': props => {
            return validateProperties(props, propsConfig, propsValidator, componentName)
          }
        }

        break
      }
    }
  }

  return ret
}
