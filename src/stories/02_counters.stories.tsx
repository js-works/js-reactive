import React, { Ref } from 'react'
import * as Spec from 'js-spec/validators'
import { component, componentActions } from '../main/index'

const { useCallback, useEffect, useImperativeHandle, useRef, useState } = React

export default {
  title: 'Counters'
}

// === SimpleCounter1 ================================================

type SimpleCounter1Props = {
  initialValue?: number,
  label?: string
}

const validateSimpleCounter1Props = Spec.checkProps({
  optional: {
    initialValue: Spec.integer,
    label: Spec.string
  }
})

const SimpleCounter1 = component<SimpleCounter1Props>({
  name: 'SimpleCounter1',
  main: SimpleCounter1View
})

function SimpleCounter1View ({
  initialValue = 0,
  label = 'Counter'
}: SimpleCounter1Props) {
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
      <h3>Simple counter 1</h3>
      <label>{label}: </label>
      <button onClick={onIncrement}>{count}</button>
    </div>
  )
}

export const simpleCounter1 = () => <SimpleCounter1/>

// === SimpleCounter2 ================================================


type SimpleCounter2Props = {
  initialValue?: number,
  label?: string
}

type SimpleCounter2State = {
  count: number
}

function initSimpleCounter2State(initialValue: number): SimpleCounter2State {
  return { count: initialValue }
}

const useSimpleCounter2Actions = componentActions(setState => ({
  incrementCount(state) {
    setState({ count: state.count + 1 })
  },

  decrementCount(state) {
    setState({ count: state.count - 1 })
  }
}), initSimpleCounter2State)

const SimpleCounter2 = component<SimpleCounter2Props>({
  name: 'SimpleCounter2',
  main: SimpleCounter2View
})

function SimpleCounter2View({
  initialValue = 0,
  label = 'Counter'
}) {
  const
    [actions, state] = useSimpleCounter2Actions(initialValue),
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
      <h3>Simple counter 2</h3>
      <label>{label}: </label>
      <button onClick={onDecrement}>-</button>
      <span> {state.count} </span>
      <button onClick={onIncrement}>+</button>
    </div>
  )
}

export const simpleCounter2 = () => <SimpleCounter2/>

// === ComplexCounter ================================================

type ComplexCounterProps = {
  label?: string,
  initialValue?: number,
  ref?: Ref<ComplexCounterMethods>
}

type ComplexCounterMethods = {
  reset(n: number): void
}

const Counter = component({
  name: 'ComplexCounterCounter',
  forwardRef: true,

  validate: Spec.checkProps({
    optional: {
      initialValue: Spec.integer,
      label: Spec.string
    }
  }),

  main: ComplexCounterView
})

function ComplexCounterView({
  initialValue = 0,
  label = 'Counter',
  ref
}: ComplexCounterProps) {
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

const ComplexCounterDemo = component('ComplexCounterDemo', () => {
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

export const complexCounter = () => <ComplexCounterDemo/>
