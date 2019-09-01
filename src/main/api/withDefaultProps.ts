import Props from '../internal/types/Props'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function withDefaultProps<P extends Props, D extends PickOptionalProps<P>>(
  defaultProps: D,
  render: (props: P & D) => any
)  {
  return (props: P & D) => {
    const defaultedProps = { ...defaultProps, ...props }

    return render(defaultedProps)
  }
}
