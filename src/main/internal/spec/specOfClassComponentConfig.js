import Platform from '../platform/Platform'
import { REGEX_DISPLAY_NAME } from '../constant/constants'
import specOfPropertiesConfig from './specOfPropertiesConfig'
import { Spec } from 'js-spec'

export default Spec.shape({
  displayName: Spec.match(REGEX_DISPLAY_NAME),
  properties: Spec.optional(specOfPropertiesConfig),
  validate: Spec.optional(Spec.function),

  methods:
    Spec.optional(
      Spec.and(
        Spec.arrayOf(Spec.string),
        Spec.unique)),

  base: Spec.any// Spec.lazy(() => Spec.instanceOf(Platform.Component))
})
