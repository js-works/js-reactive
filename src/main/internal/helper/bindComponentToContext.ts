import Props from '../types/Props'
import ComponentType from '../types/ComponentType'
import Context from '../types/Context'
import * as React from 'react'

export default function bindComponentToContext<P extends Props>(
  componentType: ComponentType<P>,
  ctxBindings: { [propName: string]: Context<any> },
  displayName: string
): ComponentType<P> {
  const
    keys = Object.keys(ctxBindings),
    involvedContexts: Context<any>[] = [],
    contextData: [string, number][] = []

  for (let i = 0; i < keys.length; ++i) {
    const
      key = keys[i],
      context = ctxBindings[key]

    let idx = involvedContexts.indexOf(context)

    if (idx === -1) {
      idx = involvedContexts.length
      involvedContexts.push(context)
    }

    contextData.push([key, idx])
  }

  const forward: any = (props: P, ref: Function) => {
    let newProps: P = null
 
    if (props && ref) {
      const keys = Object.keys(props)
      
      if (keys.length > 0) {
        newProps = Object.assign({}, props)

        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
    
          newProps[key] = props[key]
        }
      }
    }

    if (ref) {
      newProps = newProps || Object.assign({}, props)
      newProps.forwardedRef = ref
    }

    const contextValues = new Array(involvedContexts.length)

    let node = null

    for (let i = 0; i < involvedContexts.length; ++i) {
      if (i === 0) {
        node = React.createElement(involvedContexts[0].Consumer, null, (value: any) => {
          contextValues[0] = value

          for (let j = 0; j < contextData.length; ++j) {
            const [propName, contextIndex] = contextData[i]

            if ((newProps || props)[propName] === undefined) {
              const contextValue = contextValues[contextIndex]
              
              newProps = newProps || Object.assign({}, props)

              newProps[propName] = contextValue 
            }
          }

          newProps = newProps || props

          return React.createElement(componentType, newProps)
        })
      } else {
        const currNode: any = node
        
        node = React.createElement(involvedContexts[i].Consumer, null, (value: any) => {
          contextValues[i] = value 

          return currNode
        })
      }

      return node
    }
  }

  forward.displayName = displayName

  return React.forwardRef(forward)
}
