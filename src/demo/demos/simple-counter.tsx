import React from 'react'
import { Spec } from 'js-spec'

import { defineComponent } from '../../main'

const { useCallback, useEffect, useState } = React as any

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  defaultProps: {
    label: 'Counter',
    initialValue: 0
  },

  render(props) {
    const
      [count, setCount] = useState(props.initialValue),
      onIncrement = useCallback(() => setCount(count + 1))

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
  }
})

export default <Counter/>
