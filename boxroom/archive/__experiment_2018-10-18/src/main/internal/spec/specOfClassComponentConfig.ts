import { REGEX_DISPLAY_NAME, REGEX_PROP_NAME } from '../constant/constants'
import specOfPropertiesConfig from './specOfPropertiesConfig'

import React from 'react'
import { Spec } from 'js-spec'

const
  specOfClassComponentConfig =
    Spec.strictShape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      variableProps: Spec.optional(Spec.boolean),
      validate: Spec.optional(Spec.function),
      base: Spec.extends(React.Component)
    })

export default specOfClassComponentConfig
