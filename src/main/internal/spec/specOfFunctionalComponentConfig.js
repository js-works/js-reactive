import { REGEX_DISPLAY_NAME } from '../constant/constants'
import specOfPropertiesConfig from './specOfPropertiesConfig'

import { Spec } from 'js-spec'

export default Spec.shape({
  displayName: Spec.match(REGEX_DISPLAY_NAME),
  properties: Spec.optional(specOfPropertiesConfig),
  validate: Spec.optional(Spec.function),
  render: Spec.function
})
