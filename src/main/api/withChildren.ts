import React from 'react'

export default function withChildren(f: (arg: any) => any) {
  if (process.env.NODE_ENV === 'development' as any) {
    if (typeof f !== 'function') {
      throw new TypeError('[withChildren] First argument "f" must be a function')
    }
  }

  return (children: any) => f(React.Children.toArray(children))
}
