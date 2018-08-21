import Platform from '../internal/platform/Platform' 

export default function isElement(it) {
  return Platform.isValidElement(it)
}

setJsSpecValidator(isNode, it =>
  isElement(it)
    ? null
    : new Error('Must be a virtual element'))
