import validateProperties from '../validation/validateProperties'

export default function determinePropTypes(
  propsConfig, propsValidator, componentName, isCtxProvider) {

  let ret = null
  
  if (propsConfig || propsValidator) {
    for (const propName in propsConfig) {
      if (propsConfig.hasOwnProperty(propName)) {
        ret = {
          '*': props => {
            return validateProperties(
              props, propsConfig, propsValidator, componentName, isCtxProvider)
          }
        }

        break
      }
    }
  }

  return ret
}
