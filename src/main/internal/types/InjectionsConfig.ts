import Injections from './Injections'
import 'react'

type InjectionsConfig<I extends Injections> = {
  [propName in keyof I]: React.Context<I[propName]>
}
