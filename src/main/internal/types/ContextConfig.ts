type ContextConfig<T> = {
  name: string,
  default?: T,
  validate?: (value: T) => boolean | null | Error
}

export default ContextConfig
