import React, { Ref } from 'react'
import { Spec } from 'js-spec'
import { component, isRef } from '../../main'

const { useCallback, useImperativeHandle, useRef, useState } = React

type CounterProps = {
  label?: string,
  initialValue?: number,
  ref?: Ref<CounterMethods>
}

type CounterMethods = {
  reset(n: number): void
}

const Counter = component({
  displayName: 'Counter',
  forwardRef: true,

  validate: Spec.checkProps<CounterProps>({
    optional: {
      initialValue: Spec.integer,
      label: Spec.string
    }
  }),

  render: CounterView
})

function CounterView({
  initialValue = 0,
  label = 'Counter',
  ref
}: CounterProps) {
  const
    [count, setCount] = useState(initialValue),
    onIncrement = useCallback(() => setCount(count + 1), null),
    onDecrement = useCallback(() => setCount(count - 1), null)
  
  useImperativeHandle(ref, () => ({
    reset(n: number) {
      setCount(n)
    }
  }), [])

  return (
    <div>
      <label>{label}: </label>
      <button onClick={onDecrement}>-</button>
      {` ${count} `}
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

const App = component('App', () => {
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
})

export default <App/>
