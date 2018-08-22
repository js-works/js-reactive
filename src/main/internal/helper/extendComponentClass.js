export default function extendComponentClass(componentClass) {
  let ret

  if (typeof Proxy === 'function') {
    ret = new Proxy(componentClass, {
      apply (target, thisArg, args) {
        const constr = Function.prototype.bind.call(
          componentClass,
          null, args[0], args[1])
      
        return new constr()
      }
    })
  } else {
    ret = function () {
      componentClass.apply(this, arguments)
    }

    ret.prototype = Object.create(componentClass.prototype)
  }

  return ret
}
