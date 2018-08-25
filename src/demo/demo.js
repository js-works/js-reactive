const
  scenery = window.jsScenery.react || window.jsScenery.dio,
  isReact = !!window.jsScenery.react,
  platform = isReact ? window.React : window.dio,
  platformName = isReact ? 'React' : 'DIO',
  render = isReact ? window.ReactDOM.render : window.dio.render,
  { createElement: h, Component, Fragment } = platform,
  { funcComponent, classComponent } = scenery,
  { Spec } = window.jsSpec

const
  Counter = classComponent({
    displayName: 'Counter',

    properties: {
      initialValue: {
        type: Number,
        constraint: Spec.integer,
        defaultValue: 0 
      }
    },

    base: class extends Component {
      constructor(props) {
        super(props)
        this.state = { counter: props.initialValue }
      }

      increaseCounter(delta) {
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

  Demo = funcComponent({
    displayName: 'Demo',

    render() {
      return (
        h(Fragment, null,
          h('h3', null, 'jsScenery demo (', platformName, ')'),
          h(Counter)
        ))
    }
  })

render(h(Demo), document.getElementById('app'))
