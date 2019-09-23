import { FunctionComponent, ReactNode } from 'react'
import Props from './Props'

type ComponentConfig<P extends Props> = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error,
  forwardRef?: boolean,
  render(props: P): ReturnType<FunctionComponent<P>> | ReactNode // TODO
}

export default ComponentConfig
