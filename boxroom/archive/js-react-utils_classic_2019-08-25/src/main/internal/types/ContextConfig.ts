interface ContextConfig<T> {
  displayName: string,
  type?: any, // TODO
  nullable?: boolean,
  validate?: (value: T) => null | Error | true | false
  defaultValue: T
}

export default ContextConfig
