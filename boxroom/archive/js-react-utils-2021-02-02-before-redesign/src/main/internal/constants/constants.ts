const SYMBOL_ITERATOR: any =
  typeof Symbol === 'function' && Symbol.iterator
    ? Symbol.iterator
    : '@@iterator'

export { SYMBOL_ITERATOR }
