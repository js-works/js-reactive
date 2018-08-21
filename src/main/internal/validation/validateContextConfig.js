import isValidDisplayName from '../helper/isValidDisplayName'
import { REGEX_DISPLAY_NAME } from '../constant/constants';

import { Spec } from 'js-spec'

const configSpec =
  Spec.shape({
    displayName: Spec.match(REGEX_DISPLAY_NAME),
    type: Spec.optional(Spec.function),
    nullable: Spec.optional(Spec.boolean),
    constraint: Spec.optional(Spec.validator),
    defaultValue: Spec.optional(Spec.any)
  })

export default function validateConfigComponentConfig(config) {
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for context'

    if (isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += `: ${error.message}`

    throw new Error(errorMsg)
  }
}
