(() => {
  const
    scenery = window.jsScenery.react || window.jsScenery.dio,
    isReact = !!window.jsScenery.react,
    platform = isReact ? window.React : window.dio,
    platformName = isReact ? 'React' : 'DIO',
    render = isReact ? window.ReactDOM.render : window.dio.render,
    { createElement: h, Component } = platform,
    { functionalComponent, classComponent } = scenery,
    { Spec } = window.jsSpec,

    specOfListItems =
      Spec.arrayOf( 
        Spec.shape({
          text:
            Spec.string,
          items:
            Spec.optional(
              Spec.lazy(() => specOfListItems))
        }))

  const BulletedList = classComponent({
    displayName: 'BulletedList',

    properties: {
      items: {
        type: Array,
        constraint: specOfListItems
      }
    },

    base: class extends Component {
      renderItems(items) {
        return (
          h('ul', null,
            items.map((item, idx) =>
              h('li', { key: idx },
                item.text,
                item.items ? this.renderItems(item.items) : null)))
        )
      }

      render() {
        return this.renderItems(this.props.items)
      }
    }
  })

  const Demo = functionalComponent({
    displayName: 'Demo',

    render() {
      return (
        h('div', null,
          h('h3', null, 'jsScenery demo 2 (', platformName, ')'),
          h(BulletedList, { items: demoListItems }))
      )
    }
  })

  const demoListItems = [
    {
      text: 'Item 1'
    },
    {
      text: 'Item 2'
    },
    {
      text: 'Item 3',

      items: [
        {
          text: 'Item 3-1'
        },

        {
          text: 'Item 3-2',

          items: [
            {
              text: 'Item 3-2-1'
            },
            {
              text: 'Item 3-2-2',

              items: [
                {
                  text: 'Item 3-2-2-1'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      text: 'Item 4'
    },
    {
      text: 'Item 5'
    }
  ]
  
  render(h(Demo), document.getElementById('demo2'))
})()
