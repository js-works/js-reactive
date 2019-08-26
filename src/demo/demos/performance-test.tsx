import React from 'react'

import { component }  from '../../main'

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

type TileProps = {
  color?: string,
  width?: number
}

const Tile = component<TileProps>('Tile')
  .defaultProps({
    color: 'white',
    width: 3
  })
  .render(props => {
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
)

type TypeRowProps = {
  tileWidth?: number,
  columnCount: number
}

const TileRow = component<TypeRowProps>('TileRow')
  .defaultProps({
    tileWidth: 3
  })
  .render(props => {
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
)

type SpeedTestProps = {
  columnCount: number,
  rowCount: number,
  tileWidth?: number
}

const SpeedTest = component<SpeedTestProps>('SpeedTest')
  .defaultProps({
    tileWidth: 3 
  })
  .render(props => {
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
  )

export default
  <SpeedTest tileWidth={tileWidth} columnCount={columnCount} rowCount={rowCount}/>
