import Platform from '../internal/platform/Platform'

export default function fromChildren(children) {
  return new ChildrenHandler(children)
}

class ChildrenHandler {
  constructor(children) {
    this.__children = children
  }

  count() {
    return Platform.Children.count(this.__children)
  }

  map(f) {
    return Platform.Children.map(this.__children, f)
  }

  onlyOne() {
    let ret

    try {
      ret = Platform.Children.only(this.__children)
    } catch (e) {
      const count = this.count()

      throw new Error('Expected exactly one child, instead '
        + count + ' childs were given')
    }

    return ret
  }

  forEach(f) {
    return Platform.Children.forEach(this.__children, f)
  }

  toArray() {
    return Platform.Children.toArray(this.__children)
  }
}
