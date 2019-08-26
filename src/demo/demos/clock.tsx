import React from 'react'
import { component } from '../../main'

const { useEffect, useState } = React

const Clock = component('Clock')
  .render(props => {
    const
      [time, setTime] = useState(() => new Date().toLocaleTimeString())
  
    useEffect(() => {
      const id =
        setInterval(
          () => setTime(new Date().toLocaleTimeString()),
          100)

      return () => clearInterval(id)
    }, [])

    return (
      <div>
        Time: {time}
      </div>
    )
  })

export default <Clock/>
