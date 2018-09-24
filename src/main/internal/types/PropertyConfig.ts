import Props from './Props'
import Class from './Class'

type PropertyConfig<T> = {
  type?: 
    T extends string
    ? StringConstructor 
    : T extends number 
    ? NumberConstructor 
    : T extends boolean
    ? BooleanConstructor 
    : Class<T>

  nullable?: boolean,
  validate?: (value: T) => null | Error | true | false,
  optional?: true,
  defaultValue?: T 
}

export default PropertyConfig
