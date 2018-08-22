const
  scenery = window.jsScenery.react || window.jsScenery.dio,
  isReact = !!window.jsScenery.react,
  platform = isReact ? window.React : window.dio,
  platformName = isReact ? 'React' : 'DIO',
  render = isReact ? window.ReactDOM.render : window.dio.render,
  { createElement: h, Component, Fragment } = platform,
  { functionalComponent, classComponent } = scenery

const
  Counter = classComponent({
    displayName: 'Counter',

    base: class extends Component {
      constructor(props) {console.log(props)
        super(props)
        this.state = { counter: 0 }
      }

      increaseCounter(delta) {
        this.setState(state => ({ counter: state.counter + delta }))
      }

      render() {
        return (
          h('div', null,
            h('button', { onClick: () => this.increaseCounter(-1) }, '-'),
            h('span', null, this.state.counter),
            h('button', { onClick: () => this.increaseCounter(1) }, '+'))
        )
      }
    }
  }),

  Demo = functionalComponent({
    displayName: 'Demo',

    render() {
      return (
        h(Fragment, null,
          h('h3', null, 'jsScenery demo (', platformName, ')'),
          h(Counter, { x: 3})
        ))
    }
  })

render(h(Demo), document.getElementById('app'))
console.log(new Counter(333) instanceof Counter)