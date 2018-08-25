import Platform from '../internal/platform/Platform'

import validateCtxAssignmentsConfig
  from '../internal/validation/validateCtxAssignmentsConfig'

export default function assignContexts(componentType, assignments) {
  if (process.env.NODE_ENV === 'development') {
    const error = validateCtxAssignmentsConfig(assignments, componentType.displayName)

    if (error) {
      throw new Error(
        `[classComponent] ${error.message}`)
    }
  }

  const
    keys = Object.keys(assignments),
    involvedContexts = [],
    contextData = []

  for (let i = 0; i < keys.length; ++i) {
    const
      key = keys[i],
      assignment = assignments[key],
      ctx = assignment.context,
      map = assignment.map || null,
      getDefaultValue = () => assignment.defaultValue

    let idx = involvedContexts.indexOf(ctx)

    if (idx === -1) {
      idx = involvedContexts.length
      involvedContexts.push(ctx)
    }

    contextData.push([key, idx, map, getDefaultValue])
  }

  return Platform.forwardRef((props, ref) => {
    let newProps = null
    
    if (props && ref) {
      const keys = Object.keys(props)
      
      if (keys.length > 0) {
        newProps = {}

        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
    
          newProps[key] = props[key]
        }
      }
    }

    if (ref) {
      newProps = newProps || {}
      newProps.forwardedRef = ref
    }

    const contextValues = new Array(involvedContexts.length)

    let node = null

    for (let i = 0; i < involvedContexts.length; ++i) {
      if (i === 0) {
        node = Platform.createElement(involvedContexts[0].Consumer, null, value => {
          contextValues[0] = value

          for (let j = 0; j < contextData.length; ++j) {
            const [propName, contextIndex, map, getDefaultValue] = contextData[i]

            if ((newProps || props)[propName] === undefined) {
              const contextValue = contextValues[contextIndex]
              
              newProps = newProps || {}

              newProps[propName] = map ? map(contextValue) : contextValue 

              if (newProps[propName] === undefined) {
                newProps[propName] = getDefaultValue()
              }
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
  })
}
