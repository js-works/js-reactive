# jsReactUtils
A bundle of helpler functions to simplify component implementations with React

## Usage example

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { defineComponent, defineContext } from 'js-react-utils'
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
      super(props)
      this.state = { counter: props.initialValue }
      props.logger.info('Component "Counter" has been initialized')
    }

    incrementCounter(delta) {
      this.props.logger.info(`Incrementing counter by ${delta}`)
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
      <div>
        <h3>Demo<h3>
        <div><Counter/></div>
      </div>
    )
  }
})

render(<Demo/>, document.getElementById('main-content'))
```

## Benefits

- Strict separation between component meta data (displayName, properties
  description etc.) and actual component logic (render function or component
  class).

- Context values can easily be injected into the properties to be available
  everywhere in the component logic, not just in the "render" function.

- No need to use 'prop-types' library: As component properties and context values
  can be validated in a more general way, jsReactUtils is not depending on a
  React or jsReactUtils specific prop validation library.
  Instead a general validation library like for example
  [js-spec](https://github.com/js-works/js-spec) can be used. 

- As the component's meta data is defined separated from the component logic, it's
  easier to implement other component logic programming paradigms as they do not have
  to care about component meta data and context injections any longer.

  ```jsx
  connst FancyComponent = defineComponent({
    displayName: 'FancyComponent',

    properties: {
      // [...]
    },

    main: defineLogic({
      // [...]
      // In this example "defineLogic" is just a placeholder for whatever
      // custom component logic function you want to use.
      // [...]
    })  
  })
  ```

## Project status

This project is in alpha state - please do not use it in production yet.
