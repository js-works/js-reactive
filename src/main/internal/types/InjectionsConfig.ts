import Injections from './Injections'
import { Context } from 'react'

type InjectionsConfig<I extends Injections> = {
  [propName in keyof I]: {
    kind: 'context',
    source: Context<I[propName]>
  }
}

export default InjectionsConfig
