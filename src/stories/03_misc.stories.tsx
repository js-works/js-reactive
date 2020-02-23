import React from 'react'
import { component } from '../main/index'

const { useCallback, useEffect, useRef, useState } = React

export default {
  title: 'Misc demos'
}

// === StopWatch =====================================================

const StopWatch = component('StopWatch', () => {
  const
    timerIdRef = useRef(null),
    [time, setTime] = useState(() => 0),
    [isRunning, setRunning] = useState(() => false),

    onStartStop = useCallback(() => {
      if (isRunning) {
        stopTimer()
      } else {
        startTimer()
      }
    }, null),

    onReset = useCallback(resetTimer, null)

  useEffect(() => {
    return () => stopTimer()
  }, [])
  
  function startTimer() {
    if (!isRunning) {
      const startTime = Date.now() - time

      timerIdRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10)

      setRunning(true)
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(timerIdRef.current)
      timerIdRef.current = null
      setRunning(false)
    }
  }

  function resetTimer() {
    stopTimer()
    setTime(0)
  }

  return (
    <div>
      <h3>Stop Watch</h3>
      <div>Time: {time}</div>
      <br/>
      <button onClick={onStartStop}>
        { isRunning ? 'Stop' : 'Start'}
      </button>
      {' '}
      <button onClick={onReset}>
        Reset
      </button>
    </div>
  )
})

export const stopWatch = () => <StopWatch/>

// === Clock =========================================================

const Clock = component('Clock', props => {
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
      <h3>Clock</h3>
      Time: {time}
    </div>
  )
})

export const clock = () => <Clock/>
