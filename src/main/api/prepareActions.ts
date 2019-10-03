// external imports
import React from 'react'

// derived imports
const { useState, useRef } = React

// --- prepareActions ---------------------------------------------

function prepareActions<
  S extends State,
  M extends Actions<S>, 
>(
  initActions: ActionsInitializer<S, M>
): (initialState: S) => [ExternalActions<M, S>, S]

function prepareActions<
  S extends State,
  M extends Actions<S>, 
  A extends any[],
>(
  initActions: ActionsInitializer<S, M>,
  initState: StateInitializer<S, A>
): (...args: A) => [ExternalActions<M, S>, S] 

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

      [actions] = useState(() => {
        const
          actions = initActions(
            updater,
            getState
          ),

          keys = Object.keys(actions)

        for (let i = 0; i < keys.length; ++i) {
          const
            key = keys[i],
            f = actions[key]

          actions[key] = (...args: any[]) => f(getState(), ...args)
        }

        return actions
      })

    stateRef.current = state

    return [actions, state]
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }
type Actions<S extends State> = { [k: string]: (state: State, ...args: any[]) => void }
type StateUpdate<S extends State> = Partial<S> | ((state: S) => Partial<S>)
type StateSetter<S extends State> = (update: StateUpdate<S>) => void
type StateGetter<S extends State> = () => S

type ActionsInitializer<S extends State, M extends Actions<S>> =
  (setState: StateSetter<S>, getState: StateGetter<S>) => M

type StateInitializer<S extends State, A extends any[]> =
  (...args: A) => S

type ExternalActions<M extends Actions<S>, S extends State> =
 { [K in keyof M]: WithoutFirstArgument<M[K]> }

type WithoutFirstArgument<F extends ((...args: any[]) => any)>
  = F extends (firstArg: any, ...args: infer A) => infer R
    ? (...args: A) => R
    : never

// --- exports ------------------------------------------------------

export default prepareActions
