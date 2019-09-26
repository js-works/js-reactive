import React from 'react'

import { component, prepareStore } from '../../main'

const { useCallback, useEffect } = React

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

const useCounterStore = prepareStore({
  displayName: 'CounterStore',

  initState(initialValue: number) {
    return { count: initialValue }
  },

  initStore(state: CounterState, setState) {
    return {
      incrementCount() {
        setState({ count: state.count + 1 })
      },

      decrementCount() {
        setState({ count: state.count - 1 })
      },

      getCount() {
        return state.count
      }
    }
  }
})

const Counter = component<CounterProps>('Counter', ({
  initialValue = 0,
  label = 'Counter'
}) => {
  const
    store = useCounterStore(initialValue),
    onIncrement = useCallback(() => store.incrementCount(), null),
    onDecrement = useCallback(() => store.decrementCount(), null)

  useEffect(() => {
    console.log('Component has been mounted - count:', store.getCount())
  }, [])

  useEffect(() => {
    console.log('Component has been rendered - count: ', store.getCount())
  })

  return (
    <div>
      <label>{label}: </label>
      <button onClick={onDecrement}>-</button>
      <span> {store.getCount()} </span>
      <button onClick={onIncrement}>+</button>
    </div>
  )
})

export default <Counter/>
