import { FunctionComponent, ReactNode } from 'react'
import Props from './Props'
import Methods from './Methods'

type ComponentRef<M extends Methods> = { current: M } | ((ref: M) => void)

type ComponentConfig<P extends Props, M extends Methods> = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error
  render(props: P, ref?: ComponentRef<M>): ReturnType<FunctionComponent<P>> | ReactNode // TODO
}

export default ComponentConfig
