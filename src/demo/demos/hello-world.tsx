import React from 'react'
import { Spec } from 'js-spec'
import { component, Html } from '../../main'

const { div } = Html

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
    return <div>Hello, {props.name}!</div>
  })
  .create

export default
  div(
    div(
      HelloWorld()),
    div(
      HelloWorld({ name: 'Jane Doe'})))
