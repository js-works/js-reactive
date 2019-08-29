import React from 'react'
import { Spec } from 'js-spec'

import { component } from '../../main'

const { useCallback, useEffect, useState } = React

type CounterProps = {
  initialValue?: number,
  label?: string
}

const validateCounter = Spec.checkProps({
  optional: {
    initialValue: Spec.integer,
    label: Spec.string
  }
})

const Counter = component<CounterProps>('Counter', ({
  initialValue = 0,
  label = 'Counter'
}) => {
  const
    [count, setCount] = useState(initialValue),
    onIncrement = useCallback(() => setCount(count + 1), null)

  useEffect(() => {
    console.log('Component has been mounted')
  }, [])

  useEffect(() => {
    console.log('Component has been rendered')
  })

  return (
    <div>
      <label>{label}: </label>
      <button onClick={onIncrement}>{count}</button>
    </div>
  )
})

export default <Counter/>
