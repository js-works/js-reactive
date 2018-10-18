import { REGEX_DISPLAY_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

export default Spec.strictShape({
  displayName: Spec.match(REGEX_DISPLAY_NAME),
  type: Spec.optional(Spec.function),
  nullable: Spec.optional(Spec.boolean),
  validate: Spec.optional(Spec.function),
  defaultValue: Spec.any
})
