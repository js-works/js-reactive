// === exports =======================================================

export default setJsSpecValidator

// === setJsSpecValidator ============================================

function setJsSpecValidator(
  func: Function,
  validator: (it: any) => null | Error
) {
  Object.defineProperty(func, 'js-spec:validate', {
    value: validator,
  })
}
