import { REGEX_PROP_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

export default Spec.and(
  Spec.object,
  Spec.keysOf(Spec.match(REGEX_PROP_NAME)),

  Spec.valuesOf(
    Spec.and(
      Spec.shape({
        type: Spec.optional(Spec.function),
        nullable: Spec.optional(Spec.boolean),
        constraint: Spec.optional(Spec.function),
        optional: Spec.optional(Spec.boolean),
        defaultValue: Spec.optional(Spec.any)
      }),

      propConfig => {
        const
          optional = propConfig.optional,
          hasDefaultValue = propConfig.hasOwnProperty('defaultValue')

        let errorMsg = null

        if (optional === false && hasDefaultValue) {
          errorMsg = 'Parameter "optional" must not be false if "defaultValue" is provided'
        } else if (optional === false) {
          errorMsg = 'Please do not provide "optional: false" as this is redundant'
        } else if (optional === true && hasDefaultValue) {
          errorMsg = 'Please do not provide "optional: true" when "defaultValue" is also provided - this is redundant'
        }

        return errorMsg
      })))
