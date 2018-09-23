import React from 'react'
import ReactDOM from 'react-dom'
import { defineComponent, defineContext } from '../main/js-reactive'
import { Spec } from 'js-spec' // 3rd-party validation library

type Logger = {
  debug: Function
  info: Function,
  error: Function
}

type Props = {
  initialValue?: number
}

type Injections = {
  logger: Logger
}

type State = {
  counter: number
}

type AllProps = Props & Injections

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

const Counter = defineComponent<Props, Injections>({
  displayName: 'Counter',

  properties: {
    initialValue: {
      type: Number,
      validate: Spec.integer,
      defaultValue: 0
    }
  },

  inject: {
    logger: LoggerCtx
  },

  main: class extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
      super(props)
      this.state = { counter: props.initialValue }
      props.logger.info('Component "Counter" has been initialized')
    }

    incrementCounter(delta: number) {
      this.props.logger.info(`Incrementing counter by ${delta}`)
      this.setState(state => ({ counter: state.counter + delta }))
    }

    render() {
      return (
        <div className="counter">
          <button
            className="counter-decrement"
            onClick={() => this.incrementCounter(-1)}
          >
            -1
          </button>
          <div className="counter-value">
            {this.state.counter}
          </div>
          <button 
            className="counter-increment"
            onClick={() => this.incrementCounter(1)}
          >
            +1
          </button>
        </div>
      )
    }
  }
})

const Demo = defineComponent({
  displayName: 'Demo',

  render() {
    return (
      <div>
        <h3>Demo</h3>
        <div><Counter/></div>
      </div>
    )
  }
})

ReactDOM.render(<Demo/>, document.getElementById('main-content'))
