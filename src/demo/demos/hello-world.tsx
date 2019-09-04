import React from 'react'
import { Spec } from 'js-spec'
import { component, Html } from '../../main'

const { div } = Html

type HelloWorldProps = {
  name?: string
}

const validateHelloWorldProps = Spec.checkProps({
  optional: {
    name: Spec.string
  }
})

const HelloWorld = component<HelloWorldProps>('HelloWorld', ({
  name = 'World'
}) => {
  return <div>Hello {name}!</div>
}).create


export default
  div(
    div(
      HelloWorld()),
    div(
      HelloWorld({ name: 'Jane Doe'})))
