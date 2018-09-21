import { functionalComponent, classComponent, context }
  from '../main/js-compo-react';

import React, { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { Spec } from 'js-spec';

interface Logger extends Object {
  log(...args: any[]): void;
}

const
  nopLogger: Logger = {
    log() {
    }
  },

  consoleLogger: Logger = {
    log(...args: any[]) {
      console.log(...args);
    }
  },
  
  LoggerCtx = context<Logger>({
    displayName: 'LoggerCtx',
    defaultValue: nopLogger
  });

type CounterProps = {
  label?: string,
  initialValue?: number,
  logger?: Logger
}

type CounterState = {
  counter: number
}

const Counter = classComponent<CounterProps>({
  displayName: 'Counter',

  properties: {
    label: {
      type: String,
      nullable: true,
      defaultValue: ''
    },

    initialValue: {
      type: Number,
      validate: Spec.integer,
      defaultValue: 0
    }
  },

  inject: {
    logger: LoggerCtx
  },

  main: class extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
      super(props);

      props.logger!.log('Instantiating new component');

      this.state = { counter: props.initialValue as number };
      this.onClickDecrement = this.onClickDecrement.bind(this);
      this.onClickIncrement = this.onClickIncrement.bind(this);
    }

    onClickIncrement() {
      this.props.logger!.log('Incrementing...');
      this.setState({ counter: this.state.counter + 1 });
    }

    onClickDecrement() {
      this.props.logger!.log('Decrementing...');
      this.setState({ counter: this.state.counter - 1 });
    }

    render() {
      const
        { label } = this.props,
        { counter } = this.state;

      return (
        <div>
          {label ? <label>{label}</label> : null}
          {' '}
          <button onClick={this.onClickDecrement}>-</button>
          {' ' + this.state.counter + ' '}
          <button onClick={this.onClickIncrement}>+</button>
        </div>
      );
    }
  }
});

const Demo = defineComponent({
  displayName: 'Demo',

  main: () => {
    return (
      h(LoggerCtx.Provider as any, { value: consoleLogger },
        h(Counter))
    );
  }
});

ReactDOM.render(<Demo/>, document.getElementById('main-content'));