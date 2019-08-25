import React from 'react'
import { Spec } from 'js-spec'
import { component } from '../../main'

type HelloWorldProps = {
  name?: string
}

const HelloWorld = component<HelloWorldProps>('HelloWorld')
  .validate(
    Spec.checkProps({
      optional: {
        name: Spec.string
      }
    })
  )

  .defaultProps({
    name: 'world'
  })

  .render(props => {
    return <div>HELLO, {props.name.toUpperCase()}!</div>
  })

export default 
  <div>
    <div>
      <HelloWorld/>
    </div>
    <div>
      <HelloWorld name="Jane Doe"/>
    </div>
  </div> 
