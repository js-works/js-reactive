import Props from './Props'
import Class from './Class'

type PropertyConfig<T> = {
  type?: 
    T extends string
    ? Class<String>
    : T extends number 
    ? Class<Number>
    : T extends boolean
    ? Class<Boolean>
    : Class<T>

  nullable?: boolean,
  validate?: (value: T) => null | Error | true | false,
  optional?: true,
  defaultValue?: T 
}

export default PropertyConfig
