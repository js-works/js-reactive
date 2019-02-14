import React from 'react'
import { Spec } from 'js-spec'
import { defineComponent } from '../../main'

const { useCallback, useImperativeHandle, useRef, useState } = React

type CounterProps = {
  label?: string,
  initialValue?: number,
}

type CounterMethods = {
  reset(n: number): void
}

const Counter = defineComponent<CounterProps, CounterMethods>({
  displayName: 'Counter',

  properties: {
    label: {
      type: String,
      defaultValue: 'Counter'
    },

    initialValue: {
      type: Number,
      validate: Spec.integer,
      defaultValue: 0
    }
  },

  render(props, ref) {
    const
      [count, setCount] = useState(props.initialValue),
      onIncrement = useCallback(() => setCount(count + 1), null),
      onDecrement = useCallback(() => setCount(count - 1), null)
    
    useImperativeHandle(ref, () => ({
      reset(n: number) {
        setCount(n)
      }
    }), [])

    return (
      <div>
        <label>{props.label}: </label>
        <button onClick={onDecrement}>-</button>
        {` ${count} `}
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

const App = defineComponent({
  displayName: 'App',

  render() {
    const
      counterRef = useRef(null),
      onResetTo0 = useCallback(() => counterRef.current.reset(0), []),
      onResetTo100 = useCallback(() => counterRef.current.reset(100), [])

    return (
      <div>
        <Counter ref={counterRef}/>
        <br/>
        <div>
          <button onClick={onResetTo0}>Set to 0</button>
          {' '}
          <button onClick={onResetTo100}>Set to 100</button>
        </div>
      </div>
    )
  }
})

export default <App/>
