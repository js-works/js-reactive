type PickOptionalProps<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : T[K]
}

export default PickOptionalProps 
