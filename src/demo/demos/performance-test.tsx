import React from 'react'

import { defineComponent }  from '../../main'

const { useState, useEffect, useRef } = React

function useForceUpdate() {
  const [, setState] = useState(false)

  return () => {
    setState(state => !state)
  }
}

const
  framesPerSecond = 240,
  colors = ['red', 'yellow', 'orange'],
  tileWidth = 5,
  columnCount = 20,
  rowCount = 20

const Tile = defineComponent({
  displayName: 'Tile',
  
  properties: {
    color: {
      type: String,
      defaultValue: 'white'
    },
    width: {
      type: Number,
      defaultValue: 3
    }
  },
  
  render(props) {
    const
      { width, color } = props,
    
      style = {
        float: 'left',
        width: width + 'px',
        height: width + 'px',
        backgroundColor: color,
        padding: 0,
        margin: 0
      }
    
    return <div style={style as any}/> // TODO
  }
})

const TileRow = defineComponent({
  displayName:  'TileRow',
  
  properties: {
    tileWidth: {
      type: Number,
      defaultValue: 3
    },
    columnCount: {
      type: Number
    }
  },
  
  render(props) {
    const
      { tileWidth, columnCount } = props,
      tiles = []

    for (let x = 0; x < columnCount; ++x) {
      const
        colorIdx = Math.floor(Math.random() * colors.length),       
        color = colors[colorIdx]
    
      tiles.push(<Tile width={tileWidth} color={color} key={x}/>)
    }
  
    return <div style={{ clear: 'both' }}>{tiles}</div>
  }
})

type SpeedTestProps = {
  columnCount: number,
  rowCount: number,
  tileWidth: number
}

const SpeedTest = defineComponent<SpeedTestProps>({
  displayName: 'SpeedTest',

  properties: {
    columnCount: {
      type: Number
    },

    rowCount: {
      type: Number
    },

    tileWidth: {
      type: Number,
      defaultValue: 3
    }
  },
    
  render(props) {
    const
      forceUpdate = useForceUpdate(),
      intervalIdRef = useRef(null),
      startTimeRef = useRef(Date.now()),
      frameCountRef = useRef(0),
      actualFramesPerSecondRef = useRef('0'),

      rows = [],
        
      style = {
        marginTop: 40,
        marginLeft: 40
      }

      useEffect(() => {
        intervalIdRef.current = setInterval(() => {
          ++frameCountRef.current
          forceUpdate()

          if (frameCountRef.current % 10 === 0) {
            actualFramesPerSecondRef.current =
              (frameCountRef.current * 1000.0 /
                (Date.now() - startTimeRef.current)).toFixed(2)
          }
        }, 1000 / framesPerSecond)

        return () => clearInterval(intervalIdRef.current)
      }, [])
  
      for (let y = 0; y < props.rowCount; ++y) {
        rows.push(
          <TileRow
            tileWidth={props.tileWidth}
            columnCount={props.columnCount}
            key={y}
          />)
      }
      
      return (
        <div>
          <div> 
            Rows: {props.rowCount}, columns: {props.columnCount}
            <div style={style}>{rows}</div>
          </div>
          <br/>
          <div style={{ clear: 'both' }}>
            (actual frames per second: {actualFramesPerSecondRef.current})
          </div>
        </div>
      )
    }
  })

export default
  <SpeedTest tileWidth={tileWidth} columnCount={columnCount} rowCount={rowCount}/>
