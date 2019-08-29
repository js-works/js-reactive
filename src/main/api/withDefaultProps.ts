import { FunctionComponent, ReactNode } from 'react'

import Props from '../internal/types/Props'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function withDefaultProps<D extends Props>(
  defaultProps: D,
): <P extends Props>(props: P) => P & D {
  return props => ({ ...defaultProps, ...props })
}
