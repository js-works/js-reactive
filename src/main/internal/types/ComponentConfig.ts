import { FunctionComponent } from 'react'
import Props from './Props'

type ComponentConfig<P extends Props> = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error
  render(props: P): ReturnType<FunctionComponent<P>>
}

export default ComponentConfig
