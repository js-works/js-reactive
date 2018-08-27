(() => {
  const
    scenery = window.jsScenery.react || window.jsScenery.dio,
    isReact = !!window.jsScenery.react,
    platform = isReact ? window.React : window.dio,
    platformName = isReact ? 'React' : 'DIO',
    render = isReact ? window.ReactDOM.render : window.dio.render,
    { createElement: h } = platform,
    { functionalComponent } = scenery,
    { Spec } = window.jsSpec

  const Demo = functionalComponent({
    displayName: 'Demo',

    render: () =>
      h('div', null,
        h('h3', null, 'jsScenery demo 2 (', platformName, ')'),
        h(BulletedList, { items: demoListItems }))
  })

  const BulletedList = functionalComponent(() => {
    return {
      displayName: 'BulletedList',

      properties: {
        items: {
          type: Array,
          constraint: getSpecOfListItems()
        }
      },
      
      render: ({ items }) => renderItems(items)
    }

    function getSpecOfListItems() {
      const specOfListItems =
        Spec.arrayOf( 
          Spec.shape({
            text:
              Spec.string,
            items:
              Spec.optional(
                Spec.lazy(() => specOfListItems))
          }))

      return specOfListItems
    }

    function renderItems(items) {
      return (
        h('ul', null,
          items.map((item, idx) =>
            h('li', { key: idx },
              item.text,
              item.items ? renderItems(item.items) : null)))
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
