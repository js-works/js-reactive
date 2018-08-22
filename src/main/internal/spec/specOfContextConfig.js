import { REGEX_DISPLAY_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

export default Spec.shape({
  displayName: Spec.match(REGEX_DISPLAY_NAME),
  type: Spec.optional(Spec.function),
  nullable: Spec.optional(Spec.boolean),
  constraint: Spec.optional(Spec.validator),
  defaultValue: Spec.optional(Spec.any)
})
