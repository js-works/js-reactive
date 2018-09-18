import Platform from '../platform/Platform'
import { REGEX_DISPLAY_NAME, REGEX_PROP_NAME } from '../constant/constants'
import { Spec } from 'js-spec'

const
  specOfPropertiesConfig =
    Spec.and(
      Spec.object,
      Spec.keysOf(Spec.match(REGEX_PROP_NAME)),

      Spec.valuesOf(
        Spec.and(
          Spec.shape({
            type: Spec.optional(Spec.function),
            nullable: Spec.optional(Spec.boolean),
            validate: Spec.optional(Spec.function),
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

            return errorMsg ? new Error(errorMsg) : null
          }))),

  specOfFunctionalComponentConfig =
    Spec.shape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      validate: Spec.optional(Spec.function),
      render: Spec.function
    }),
  
  specOfClassComponentConfig =
    Spec.shape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      validate: Spec.optional(Spec.function),

      inject:
        Spec.optional(
          Spec.and(
            Spec.hasSomeKeys,
            Spec.keysOf(Spec.match(REGEX_PROP_NAME)),
            /*Spec.valuesOf(Platform.isContext)*/)),

      methods:
        Spec.optional(
          Spec.and(
            Spec.arrayOf(Spec.string),
            Spec.unique)),

      main: Spec.lazy(() => Spec.extends(Platform.Component))
    }),

  specOfComponentConfig = 
    Spec.and(
      Spec.object,
      Spec.or(
        {
          when: Spec.hasOwnProp('render'),
          then: specOfFunctionalComponentConfig
        },
        {
          when: Spec.hasOwnProp('main'),
          then: specOfClassComponentConfig
        },
        {
          when: Spec.any,
          then: Spec.fail('Either parameter "render" or parameter "main" must be configured')
        }))

export default specOfComponentConfig
