# jsReactive
A bundle of helpler functions to simplify component implementations with React

## Usage exsample

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { defineComponent, defineContext } from 'js-reactive'
import { Spec } from 'js-spec' // 3rd-party validation library

const consoleLogger = {
  debug: console.debug,
  info: console.info,
  error: console.error
}

const LoggerCtx = defineContext({
  displayName: 'LoggerCtx',

  validate: Spec.shape({
    debug: Spec.function,
    info: Spec.function,
    error: Spec.function
  }),

  defaultValue: ConsoleLogger
})

const Counter = defineComponent({
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

  main: class extends Component {
    constructor(props) {
      supper(props)
      this.state = { counter: props.initialValue }
      props.logger.debug('Component "Counter" has been initialized')
    }

    incrementCounter(delta) {
      this.props.logger.debug(`Incrementing counter by ${delta}`)
      this.setState(state => ({ counter: state.counter + delta }))
    }

    render() {
      return (
        <div className="cmpnt-counter">
          <button onClick={() => this.incrementCounter(-1)}>
            -1
          </button>
          <div>
            {this.state.counter}
          </div>
          <button onClick={() => this.incrementCounter(1)}>
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
      <h3>Deomo<h3>
      <div><Counter/></div>
    )
  }
})

render(<Demo/>, document.getElementById('main-content'))
```

## Project status

This project is in alpha state - please do not use it in production yet.
