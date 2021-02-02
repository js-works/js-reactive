// external imports
import React, { ReactNode } from 'react'

// === exports =======================================================

export default withChildren

// === withChildren ==================================================

function withChildren(f: (arg: any) => any) {
  if (process.env.NODE_ENV === ('development' as any)) {
    if (typeof f !== 'function') {
      throw new TypeError(
        '[withChildren] First argument "f" must be a function'
      )
    }
  }

  return (children: ReactNode | ReactNode[]) =>
    f(React.Children.toArray(children))
}
