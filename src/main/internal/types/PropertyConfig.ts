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
    : T extends Function
    ? FunctionConstructor
    : T extends Symbol
    ? SymbolConstructor
    : Class<T>

  nullable?: boolean,
  validate?: (value: T) => null | Error | true | false,
  required?: boolean,
  defaultValue?: T 
}

export default PropertyConfig
