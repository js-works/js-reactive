import Platform from '../platform/Platform'

export default function bindComponentToContext(componentType, ctxBindings, displayName) {
  const
    keys = Object.keys(ctxBindings),
    involvedContexts = [],
    contextData = []

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

  const forward = (props, ref) => {
    let newProps = null
 
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
        node = Platform.createElement(involvedContexts[0].Consumer, null, value => {
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

          return Platform.createElement(componentType, newProps)
        })
      } else {
        const currNode = node
        
        node = Platform.createElement(involvedContexts[i].Consumer, null, value => {
          contextValues[i] = value 

          return currNode
        })
      }

      return node
    }
  }

  forward.displayName = displayName

  return Platform.forwardRef(forward)
}
