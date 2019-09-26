// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- prepareStore -------------------------------------------------

function prepareStore<
  S extends State,
  M extends Store, 
>(
  initStore: StoreInitializer<S, M>
): (initialState: S) => M

function prepareStore<
  S extends State,
  M extends Store, 
  A extends any[],
>(
  initStore: StoreInitializer<S, M>,
  initState: StateInitializer<S, A>
): (...args: A) => M 

function prepareStore(initStore: Function, initState?: Function): Function {
  return function useStore(...args: any[]): any {
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
      
      [store] = useState(() => initStore(
        createStateProxy(stateRef),
        updater,
        getState
      ))
        
    stateRef.current = state

    return store
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }
type Store = { [k: string]: (...args: any[]) => any }
type StateUpdate<S extends State> = Partial<S> | ((state: S) => Partial<S>)
type StateSetter<S extends State> = (update: StateUpdate<S>) => void
type StateGetter<S extends State> = () => S

type StoreInitializer<S extends State, M extends Store> =
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

export default prepareStore