const
  SYMBOL_ITERATOR =
    typeof Symbol === 'function'
      && Symbol.iterator
      ? Symbol.iterator
      : '@@iterator',

  REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/,
  REGEX_PROP_NAME = /^[a-z][a-zA-Z0-9]*$/

export {
  SYMBOL_ITERATOR,
  REGEX_DISPLAY_NAME,
  REGEX_PROP_NAME
}
