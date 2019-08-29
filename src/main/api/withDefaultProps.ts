import { FunctionComponent, ReactNode } from 'react'

import Props from '../internal/types/Props'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function withDefaultProps<P extends Props, D extends Partial<PickOptionalProps<P>>>(
  defaultProps: D,
  renderer: (props: P & D) => ReturnType<FunctionComponent<P>>
): FunctionComponent<P> {
  return props => renderer({ ...defaultProps, ...props })
}
