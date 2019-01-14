import React from 'react'
import { defineComponent } from '../../main'

const { useEffect, useState } = React as any

const Clock = defineComponent({
  displayName: 'Clock',

  render() {
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
  }
})

export default <Clock/>
