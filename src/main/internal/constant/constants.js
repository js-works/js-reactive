export const SYMBOL_ITERATOR =
  typeof Symbol === 'function'
    && Symbol.iterator
      ? Symbol.iterator
      : '@@iterator'

export const REGEX_DISPLAY_NAME = /^[A-Z][a-zA-Z0-9.]*$/
