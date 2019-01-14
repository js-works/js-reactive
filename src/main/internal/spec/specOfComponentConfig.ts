import { REGEX_DISPLAY_NAME, REGEX_PROP_NAME } from '../constant/constants'
import isContext from '../helper/isContext'
import PropertiesConfig from '../types/PropertiesConfig'

import React from 'react'
import { Spec, SpecError } from 'js-spec'

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
            required: Spec.optional(Spec.boolean),
            defaultValue: Spec.optional(Spec.any)
          }),

          (propConfig: PropertiesConfig<any>) => {
            const
              required = propConfig.required,
              hasRequiredParam = propConfig.hasOwnProperty('required'),
              hasDefaultValue = propConfig.hasOwnProperty('defaultValue')

            let errorMsg = null

            if (hasRequiredParam && hasDefaultValue) {
              errorMsg = 'The parameters "required" and "defaultValue" must '
                + 'not be set both at once'
            } else if (required === false) {
              errorMsg = 'Please do not provide "required: false" as this is redundant'
            }

            return errorMsg ? new Error(errorMsg) : null
          }))),

  specOfDefaultPropsConfig =
    Spec.and(
      Spec.object,
      Spec.hasSomeKeys,
      Spec.keysOf(Spec.match(REGEX_PROP_NAME))),

  specOfComponentConfig = 
    Spec.and(
      Spec.strictShape({
        displayName: Spec.match(REGEX_DISPLAY_NAME),
        properties: Spec.optional(specOfPropertiesConfig),
        variableProps: Spec.optional(Spec.boolean),
        defaultProps: Spec.optional(specOfDefaultPropsConfig),
        validate: Spec.optional(Spec.function),

        methods:
          Spec.optional(
            Spec.and(
              Spec.arrayOf(Spec.string),
              Spec.unique())),

        render: Spec.function
      }),
    
      config => {
        let error = null

        if (config.hasOwnProperty('defaultProps')) {
          if (config.hasOwnProperty('properties')) {
            error = new SpecError('It\'s not allowed to configure both parameter "properties" and "defaultProps" at the same time')
          } else if (config.hasOwnProperty('variableProps')) {
            error = new SpecError('It\'s not allowed to configure both parameter "variableProps" and "defaultProps" at the same time')
          }
        }

        return error
      })


export default specOfComponentConfig
