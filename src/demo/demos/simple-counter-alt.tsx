import React from 'react'
import { Spec } from 'js-spec'
import { component, useActions } from '../../main'

const { useCallback, useEffect, useState } = React

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

const initActions = () => ({
  increment(state: CounterState) {
    return { count: state.count + 1 }
  }
})

const Counter = component<CounterProps>('Counter')
  .validate(
    Spec.checkProps({
      optional: {
        initialValue: Spec.integer,
        label: Spec.string
      }
    })
  )
  .defaultProps({
    initialValue: 0,
    label: 'Counter'
  })
  .render(props => {
    const
      [actions, state] = useActions(initActions, () => ({ count: props.initialValue })),
      onIncrement = useCallback(() => actions.increment(), [])

    useEffect(() => {
      console.log('Component has been mounted')
    }, [])

    useEffect(() => {
      console.log('Component has been rendered - current state: ', state)
    })

    return (
      <div>
        <label>{props.label}: </label>
        <button onClick={onIncrement}>{state.count}</button>
      </div>
    )
  })

export default <Counter/>
