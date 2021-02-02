import React from 'react'
import { component, Html } from '../main/index'

const { div, h3 } = Html

export default {
  title: 'Hello world'
}

// === HelloWorld1 ===================================================

type HelloWorldProps = {
  name?: string
}

const HelloWorld = component<HelloWorldProps>('HelloWorld', ({
  name = 'world'
}) => {
  return <div>Hello, {name}!</div>
}).create


export const helloWorld = () =>
  div(
    h3('HelloWold (using default name)'),
    HelloWorld()
  )

export const helloJane = () =>
  div(
    h3('HelloWorld (using custom name)'),
    HelloWorld({ name: 'Jane' })
  )
