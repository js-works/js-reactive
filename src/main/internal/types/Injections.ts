import * as React from 'react'

type Injections = {
  [propName: string]: React.Context<any> 
}

export default Injections
