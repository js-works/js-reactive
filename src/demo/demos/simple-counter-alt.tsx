import React from 'react'
import { Spec } from 'js-spec'

import { component } from '../../main'

const { useCallback, useEffect, useState } = React

type CounterProps = {
  initialValue?: number,
  label?: string
}

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
      [count, setCount] = useState(props.initialValue),
      onIncrement = useCallback(() => setCount(count + 1), null)

    useEffect(() => {
      console.log('Component has been mounted')
    }, [])

    useEffect(() => {
      console.log('Component has been rendered')
    })

    return (
      <div>
        <label>{props.label}: </label>
        <button onClick={onIncrement}>{count}</button>
      </div>
    )
  })

export default <Counter initialValue={1000} label="My Counter:"/>
