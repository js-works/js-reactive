import { Spec } from 'js-spec';

const configSpec =
  Spec.shape({
    displayName: Spec.string,
    type: Spec.optional(Spec.function),
    defaultValue: Spec.optional(Spec.any)
  })

export default validateClassComponentConfig(config) {
  return configSpec.validate(config)
}