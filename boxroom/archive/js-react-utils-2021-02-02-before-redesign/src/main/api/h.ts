import React, { ComponentType, ReactElement, ReactNode } from 'react'

import { SYMBOL_ITERATOR } from '../internal/constants/constants'

function h(): ReactNode {
  let ret: ReactNode = null

  const
    argCount = arguments.length,
    secondArg = arguments[1],
    
    skipsProps =
      argCount > 1 && secondArg !== undefined && secondArg !== null
          && (typeof secondArg !== 'object' || secondArg[SYMBOL_ITERATOR] || React.isValidElement(secondArg))

  if (!skipsProps) {
    ret = React.createElement.apply(null, arguments)
  } else {
    const args: any[] = [arguments[0], null]

    for (let i = 1; i < argCount; ++i) {
      args.push(arguments[i])
    }

    ret = React.createElement.apply(null, args)
  }

  return ret
}

export default h
