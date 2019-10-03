import React from 'react'

import { component, prepareActions } from '../../main'

const { useCallback, useEffect } = React

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

function initCounterState(initialValue: number): CounterState {
  return { count: initialValue }
}

const useCounterActions = prepareActions(setState => {
  return {
    incrementCount(state) {
      setState({ count: state.count + 1 })
    },

    decrementCount(state) {
      setState({ count: state.count - 1 })
    }
  }
}, initCounterState)

const Counter = component<CounterProps>('Counter', ({
  initialValue = 0,
  label = 'Counter'
}) => {
  const
    [actions, state] = useCounterActions(initialValue),
    onIncrement = useCallback(() => actions.incrementCount(), null),
    onDecrement = useCallback(() => actions.decrementCount(), null)

  useEffect(() => {
    console.log('Component has been mounted - state:', state)
  }, [])

  useEffect(() => {
    console.log('Component has been rendered - state: ', state)
  })

  return (
    <div>
      <label>{label}: </label>
      <button onClick={onDecrement}>-</button>
      <span> {state.count} </span>
      <button onClick={onIncrement}>+</button>
    </div>
  )
})

export default <Counter/>
