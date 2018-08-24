import validateProperties from '../validation/validateProperties'

export default function determinePropTypes(
  propsConfig, propsValidator, componentName, isCtxProvider) {

  let ret = null
  
  ret = {
    '*': props => {
      return validateProperties(
        props, propsConfig, propsValidator, componentName, isCtxProvider)
    }
  }

  return ret
}
