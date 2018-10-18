import React from 'react'
import ReactDOM from 'react-dom'
import { classComponent, functionComponent, context } from '../main/js-react-utils'
import { Spec } from 'js-spec/dev-only' // 3rd-party validation library

type Props = {
  initialValue?: number
}

type State = {
  counter: number
}

const Counter = classComponent({
  displayName: 'Counter',

  properties: {
    initialValue: {
      type: Number,
      validate: Spec.integer,
      defaultValue: 0
    }
  },

  base: class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props)
      this.state = { counter: props.initialValue }
    }

    incrementCounter(delta: number) {
      this.setState(state => ({ counter: state.counter + delta }))
    }

    reset() {
      this.setState({ counter: 0})
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

type DemoProps = {}

const Demo = classComponent({
  displayName: 'Demo',

  base: class extends React.Component<DemoProps> {
    private _counter: any = null

    render() {
      return (
        <div>
          <h3>Demo</h3>
          <div><Counter ref={(it: any) => this._counter = it }/></div>
          <br/>
          <button onClick={() => this._counter.reset()}>Reset to 0</button>
        </div>
      )
    }
  }
})


ReactDOM.render(<Demo/>, document.getElementById('main-content'))
