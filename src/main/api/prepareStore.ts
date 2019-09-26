// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- prepareStore -------------------------------------------------

function prepareStore<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => any }
>(config: StoreConfig<S, A, M>): (...args: A) => M {

  const
    displayName = config.displayName,
    hookName = 'use' + displayName[0].toUpperCase() + displayName.substr(1)
    
  function useStore(...args: any[]): any {
    const
      [state, setState] = useState(() => config.initState.apply(null, args)),

      stateRef = useRef(state),

      getState = () => stateRef.current,
      
      [store] = useState(() => config.initStore(
        createStateProxy(stateRef),
        (newState: any) => setState((oldState: any) => Object.assign({}, oldState, newState)),
        getState
      ))
        
    stateRef.current = state

    return store
  }

  Object.defineProperty(useStore, 'name', {
    value: hookName
  })

  return useStore
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type StoreConfig<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }> =
{
  displayName: string,

  initState: (...args: A) => S,
  
  initStore(
    state: S,
    setState: (state: Partial<S>) => void,
    getState: () => S
  ): M
}

function createStateProxy<S extends State>(stateRef: { current: S }): S {
  const ret: any = {}
  
  for (const k of Object.keys(stateRef.current)) {
    Object.defineProperty(ret, k, {
      get: () => stateRef.current[k]
    })
  }

  return ret
}

// --- exports ------------------------------------------------------

export default prepareStore