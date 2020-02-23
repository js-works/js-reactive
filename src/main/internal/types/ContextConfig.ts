type ContextConfig<T> = {
  name: string,
  defaultValue?: T,
  validate?: (value: T) => boolean | null | Error
}

export default ContextConfig
