import Platform from '../internal/platform/Platform'

export default function withChildren(f) {
  if (typeof f !== 'function') {
    throw new TypeError('[withChildren] First argument "f" must be a function')
  }

  return children => f(Platform.Children.toArray(children))
}
