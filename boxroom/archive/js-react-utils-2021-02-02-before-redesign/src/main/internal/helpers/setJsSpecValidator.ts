export default function setJsSpecValidator(
  func: Function,
  validator: (it: any) => null | Error
) {
  Object.defineProperty(func, 'js-spec:validate', {
    value: validator
  })
}
