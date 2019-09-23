// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- prepareActions ---------------------------------------------

function prepareActions<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: ActionsConfig<S, A, M>): (...args: A) => [M, S] 

function prepareActions<
  S extends State
>(): <
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: ActionsConfig<S, A, M>) => (...args: A) => [M, S]

function prepareActions(/* arguments */): any {
  if (arguments.length === 0) {
    return (config: any) => prepareActions(config)
  }

  const
    config = arguments[0],
    displayName = config.displayName,
    hookName = 'use' + displayName[0].toUpperCase() + displayName.substr(1)
    
  function useActions(...args: any[]): any {
    const
      [state, setState] = useState(() => config.initState.apply(null, args)),

      stateRef = useRef(state),

      getState = () => stateRef.current,
      
      [actions] = useState(() => config.initActions(
        createStateProxy(stateRef),
        (newState: any) => setState((oldState: any) => Object.assign({}, oldState, newState)),
        getState
      ))
        
    stateRef.current = state

    return [actions as any, state]
  }

  Object.defineProperty(useActions, 'name', {
    value: hookName
  })

  return useActions
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type ActionsConfig<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }> =
{
  displayName: string,

  initState: (...args: A) => S,
  
  initActions(
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

export default prepareActions
