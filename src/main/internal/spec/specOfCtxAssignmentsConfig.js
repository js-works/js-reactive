import Platform from '../platform/Platform'
import { REGEX_PROP_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

export default Spec.and(
  Spec.object,
  Spec.keysOf(Spec.match(REGEX_PROP_NAME)),
  Spec.valuesOf(Spec.shape({
    context: Spec.lazy(() => Spec.valid(Platform.isContext))
      .usingHint('Must be a context type'),

    map: Spec.optional(Spec.function),
    defaultValue: Spec.optional(Spec.any)
  }))
)