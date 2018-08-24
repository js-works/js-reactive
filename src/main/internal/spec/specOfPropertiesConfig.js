import { REGEX_PROP_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

export default Spec.and(
  Spec.object,
  Spec.keysOf(Spec.match(REGEX_PROP_NAME)),

  Spec.valuesOf(
    Spec.shape({
      type: Spec.optional(Spec.function),
      nullable: Spec.optional(Spec.boolean),
      constraint: Spec.optional(Spec.validator),
      defaultValue: Spec.optional(Spec.any)
    })))
