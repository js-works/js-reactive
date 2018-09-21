import * as React from 'react'

export default function fromChildren(children: any) {
  return new ChildrenHandler(children)
}

class ChildrenHandler {
  private __children: any

  constructor(children: any) {
    this.__children = children
  }

  count() {
    return React.Children.count(this.__children)
  }

  map(f: (child: any) => any) {
    return React.Children.map(this.__children, f)
  }

  onlyOne() {
    let ret

    try {
      ret = React.Children.only(this.__children)
    } catch (e) {
      const count = this.count()

      throw new Error('Expected exactly one child, instead '
        + count + ' childs were given')
    }

    return ret
  }

  forEach(f: (child: any) => any) {
    return React.Children.forEach(this.__children, f)
  }

  toArray() {
    return React.Children.toArray(this.__children)
  }
}
