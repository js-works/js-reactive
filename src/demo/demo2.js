(() => {
  const
    { createElement: h } = window.React,
    { render } = window.ReactDOM,
    { defineComponent } = window.jsScenery,
    { Spec } = window.jsSpec

  const Demo = defineComponent({
    displayName: 'Demo2',

    render: () =>
      h('div', null,
        h('h3', null, 'jsScenery demo 2'),
        h(BulletedList, { items: demoListItems }))
  })

  const BulletedList = defineComponent(() => {
    return {
      displayName: 'BulletedList',

      properties: {
        items: {
          type: Array,
          validate: getSpecOfListItems()
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
