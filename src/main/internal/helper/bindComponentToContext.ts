import Props from '../types/Props'
import ComponentType from '../types/ComponentType'
import Context from '../types/Context'
import React from 'react'

export default function bindComponentToContext<P extends Props>(
  componentType: ComponentType<P>,
  ctxBindings: { [propName: string]: Context<any> },
  displayName: string
): ComponentType<P> {
  const
    propNames = Object.keys(ctxBindings),
    contextData: ({ context: Context<any>, propName: string })[] = []

  for (let i = 0; i < propNames.length; ++i) {
    const
      propName = propNames[i],
      context = ctxBindings[propName]

    contextData.push({ context, propName })
  }

  const forward: any = (props: P, ref: Function) => {
    const
      newProps: { [key in keyof P]: any } = <any>{},
      keys = Object.keys(props)

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i]

      newProps[key] = props[key]
    }

    if (ref) {
      newProps.forwardedRef = ref
    }

    let node = null

    for (let i = 0; i < contextData.length; ++i) {
      if (i === 0) {
        const { propName, context } = contextData[0]
        
        node = React.createElement(context.Consumer, null, (value: any) => {
          newProps[propName] = value

          return React.createElement(componentType, newProps)
        })
      } else {
        const
          { propName, context } = contextData[i],
          currNode: any = node
        
        node = React.createElement(context.Consumer, null, (value: any) => {
          newProps[propName] = value

          return currNode
        })
      }

      return node
    }
  }

  forward.displayName = displayName

  return React.forwardRef(forward)
}
