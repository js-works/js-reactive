import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent, defineContext } from '../main/js-react-utils'
import { Spec } from 'js-spec/dev-only' // 3rd-party validation library

const { useState, useContext, useImperativeMethods } = React as any

type Logger = {
  debug: Function
  info: Function,
  error: Function
}

type CounterProps = {
  initialValue?: number
}


type CounterMethods = {
  reset: (value: number) => void  
}

type State = {
  counter: number
}

const consoleLogger: Logger = {
  debug: console.debug,
  info: console.info,
  error: console.error
}

const LoggerCtx = defineContext<Logger>({
  displayName: 'LoggerCtx',

  validate: Spec.shape({
    debug: Spec.function,
    info: Spec.function,
    error: Spec.function
  }),

  defaultValue: consoleLogger
})

const Counter = defineComponent<CounterProps, CounterMethods>({
  displayName: 'Counter',

  properties: {
    initialValue: {
      type: Number,
      validate: Spec.integer,
      defaultValue: 1
    }
  },

  methods: ['reset'],

  main({ initialValue }, ref) {
    const
      [counterValue, setCounterValue] = useState(0),
      logger = useContext(LoggerCtx)
  
    function increaseCounter(delta: number) {
      logger.info('Increasing counter by ' + delta)

      setCounterValue(counterValue + delta)
    }

    useImperativeMethods(ref, () => ({
      reset: (value: number = 0) => {
        logger.info('Resetting counter to ' + value)
        setCounterValue(value)
      }
    }))

    return (
      <div className="counter">
        <button
          className="counter-decrement"
          onClick={() => increaseCounter(-1)}>
          -
        </button>
        <div className="counter-value">
          {counterValue}
        </div>
        <button
          className="counter-increment"
          onClick={() => increaseCounter(1)}>
          +
        </button>
      </div>
    )
  }
})

type DemoCounterProps = {}

const Demo = defineComponent<DemoCounterProps>({
  displayName: 'Demo',

  main: class extends React.Component<DemoCounterProps> {
    private _counter: CounterMethods = null

    render() {
      return (
        <div>
          <h3>Demo</h3>
          <div><Counter ref={(it: CounterMethods) => this._counter = it} /></div>
          <br/>
          <button onClick={() => this._counter.reset(0)}>Reset to 0</button>
        </div>
      )
    }
  }
})


ReactDOM.render(<Demo/>, document.getElementById('main-content'))
