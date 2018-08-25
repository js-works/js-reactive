const
  scenery = window.jsScenery.react || window.jsScenery.dio,
  isReact = !!window.jsScenery.react,
  platform = isReact ? window.React : window.dio,
  platformName = isReact ? 'React' : 'DIO',
  render = isReact ? window.ReactDOM.render : window.dio.render,
  { createElement: h, Component } = platform,
  { functionalComponent, classComponent, context, connectContext } = scenery,
  { Spec } = window.jsSpec

class Logger {
  constructor(log) {
    this.log = log
  }

  log() {
  }
}

const
  infoLogger = new Logger(console.info),
  errorLogger = new Logger(console.error),

  LoggerCtx = context({
    displayName: 'LoggerCtx',
    type: Logger,
    defaultValue: infoLogger
  }),

  Counter = classComponent({
    displayName: 'Counter',

    properties: {
      initialValue: {
        type: Number,
        constraint: Spec.integer,
        defaultValue: 0 
      },

      logger: {
        type: Logger,
        defaultValue: Logger.default
      }
    },

    base: class extends Component {
      constructor(props) {
        super(props)
        this.state = { counter: props.initialValue }
        props.logger.log('Counter has been initialized')
      }

      increaseCounter(delta) {
        this.props.logger.log('Increases counter by ' + delta)
        this.setState(state => ({ counter: state.counter + delta }))
      }

      render() {
        return (
          h('div', null,
            h('button', { onClick: () => this.increaseCounter(-1) }, '-'),
            h('span', null, ' ', this.state.counter, ' '),
            h('button', { onClick: () => this.increaseCounter(1) }, '+'))
        )
      }
    }
  }),

  WrappedCounter = connectContext(Counter, {
    logger: {
      context: LoggerCtx
    }
  }),

  Demo = functionalComponent({
    displayName: 'Demo',

    render() {
      return (
        h(LoggerCtx.Provider, { value: errorLogger },
          h('h3', null, 'jsScenery demo (', platformName, ')'),
          h(WrappedCounter)
        ))
    }
  })

render(h(Demo), document.getElementById('app'))
