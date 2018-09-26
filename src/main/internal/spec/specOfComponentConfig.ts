import { REGEX_DISPLAY_NAME, REGEX_PROP_NAME } from '../constant/constants'
import isContext from '../helper/isContext'
import PropertiesConfig from '../types/PropertiesConfig'

import React from 'react'
import { Spec } from 'js-spec'

const
  specOfPropertiesConfig =
    Spec.and(
      Spec.object,
      Spec.keysOf(Spec.match(REGEX_PROP_NAME)),

      Spec.valuesOf(
        Spec.and(
          Spec.strictShape({
            type: Spec.optional(Spec.function),
            nullable: Spec.optional(Spec.boolean),
            validate: Spec.optional(Spec.function),
            optional: Spec.optional(Spec.boolean),
            defaultValue: Spec.optional(Spec.any)
          }),

          (propConfig: PropertiesConfig<any>) => {
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

  specOfInjectConfig =
    Spec.optional(
      Spec.and(
        Spec.hasSomeKeys,
        Spec.keysOf(Spec.match(REGEX_PROP_NAME)),
        Spec.valuesOf(
          Spec.or(
            {
              when: Spec.prop('kind', Spec.is('context')),

              then:
                Spec.strictShape({
                  kind: Spec.is('context'),
                  source: isContext
                })
            })))),

  specOfFunctionalComponentConfig =
    Spec.strictShape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      validate: Spec.optional(Spec.function),
      render: Spec.function
    }),
  
  specOfClassComponentConfig =
    Spec.strictShape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      variableProps: Spec.optional(Spec.boolean),
      validate: Spec.optional(Spec.function),

      inject: specOfInjectConfig,

      methods:
        Spec.optional(
          Spec.and(
            Spec.arrayOf(Spec.string),
            Spec.unique)),

      main: Spec.extends(React.Component)
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
