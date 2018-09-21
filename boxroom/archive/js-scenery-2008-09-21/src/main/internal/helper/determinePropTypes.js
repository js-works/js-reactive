import validateProperties from '../validation/validateProperties'

export default function determinePropTypes(
  propsConfig, propsValidator, variableProps, componentName, isCtxProvider) {

  let ret = null
  
  ret = {
    '*': props => {
      return validateProperties(
        props, propsConfig, propsValidator, variableProps, componentName, isCtxProvider)
    }
  }

  return ret
}
