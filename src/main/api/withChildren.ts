import * as React from 'react'

export default function withChildren(f: (arg: any) => any) {
  if (typeof f !== 'function') {
    throw new TypeError('[withChildren] First argument "f" must be a function')
  }

  return (children: any) => f(React.Children.toArray(children))
}
