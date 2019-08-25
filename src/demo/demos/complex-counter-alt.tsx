import React from 'react'
import { Spec } from 'js-spec'
import { component, isRef } from '../../main'

const { useCallback, useImperativeHandle, useRef, useState } = React

type CounterProps = {
  label?: string,
  initialValue?: number
}

type CounterMethods = {
  reset(n: number): void
}

const Counter = component<CounterProps, CounterMethods>('Counter')
  .validate(
    Spec.checkProps({
      optional: {
        initialValue: Spec.integer,
        label: Spec.string,
        componentRef: isRef
      }
    })
  )
  .defaultProps({
    initialValue: 0,
    label: 'Counter'
  })
  .render((props, ref) => {
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
  })

const App = component('App')
  .render(() => {
    const
      counterRef = useRef(null),
      onResetTo0 = useCallback(() => counterRef.current.reset(0), []),
      onResetTo100 = useCallback(() => counterRef.current.reset(100), [])

    return (
      <div>
        {
          React.createElement(Counter as any, { ref: counterRef }) // TODO !!!
        }
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
