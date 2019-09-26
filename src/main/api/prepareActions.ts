// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- prepareActions ---------------------------------------------

function prepareActions<
  S extends State,
  M extends Actions, 
>(
  initActions: ActionsInitializer<S, M>
): (initialState: S) => [M, S]

function prepareActions<
  S extends State,
  M extends Actions, 
  A extends any[],
>(
  initActions: ActionsInitializer<S, M>,
  initState: StateInitializer<S, A>
): (...args: A) => [M, S] 

function prepareActions(initActions: Function, initState?: Function): Function {
  return function useActions(...args: any[]): any {
    const
      [state, setState] = useState(() => 
        initState ? initState.apply(null, args) : args[0]),

      stateRef = useRef(state),

      getState = () => stateRef.current,
      
      updater = (update: any) => {
        if (typeof update === 'function') {
          setState((prevState: any) =>
            Object.assign({}, prevState, update(prevState)))
        } else {
          setState((prevState: any) =>
            Object.assign({}, prevState, update))
        }
      },

      [actions] = useState(() => initActions(
        createStateProxy(stateRef),
        updater,
        getState
      ))

    stateRef.current = state

    return [actions, state]
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }
type Actions = { [k: string]: (...args: any[]) => void }
type StateUpdate<S extends State> = Partial<S> | ((state: S) => Partial<S>)
type StateSetter<S extends State> = (update: StateUpdate<S>) => void
type StateGetter<S extends State> = () => S

type ActionsInitializer<S extends State, M extends Actions> =
  (state: S, setState: StateSetter<S>, getState: StateGetter<S>) => M

type StateInitializer<S extends State, A extends any[]> =
  (...args: A) => S

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
