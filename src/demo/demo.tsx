import React from 'react'
import ReactDOM from 'react-dom'

import { component } from '../main'
import availableDemos from './available-demos'

const { useState } = React

// --- Component DemoSelector ---------------------------------------

type DemoAppProps = {
  demos?: [string, any][]
}

const DemoApp = component<DemoAppProps>('DemoApp', ({
  demos
}) => {
  const
    [demoIdx, setDemoIdx] = useState(getCurrentDemoIndex())

  function startDemo(idx: number) {
    setDemoIdx(idx)
    document.location.href = document.location.href.replace(/#.*$/, '') + '#idx=' + idx
    console.clear()
  }

  const options = []

  for (let i = 0; i < demos.length; ++i) {
    const demo = demos[i]

    options.push(<option key={i} value={i}>{demo[0]}</option>)
  }

  return (
    <div>
      <label>Select demo:</label>
      <select
        onChange={ (ev: any) => startDemo(ev.target.value) }
        value={demoIdx}
        autoFocus={true}
      >
        {options}
      </select>
      <div>
        <h4>Example: {demos[demoIdx][0]}</h4>
        {demos[demoIdx][1]}
      </div>
    </div>
  )
})

function getCurrentDemoIndex() {
  return parseInt(document.location.href.replace(/^.*idx=/, ''), 10) || 0
}

// --- main ---------------------------------------------------------

ReactDOM.render(
  <DemoApp demos={availableDemos} /> as any,
  document.getElementById('main-content'))
