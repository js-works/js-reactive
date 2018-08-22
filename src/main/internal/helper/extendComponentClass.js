export default function extendComponentClass(componentClass) {
  let ret
  
  const constr = Function.prototype.bind.call(componentClass, null)

  if (typeof Proxy === 'function') {
    ret = new Proxy(componentClass, {
      apply (target, self, args) {console.log(self)
        constr.call(self, args[0], args[1])

        return self
      }
    })
  } else {
    ret = function () {
      componentClass.apply(this, arguments)
    }

    ret.prototype = Object.create(componentClass.prototype)
  }
console.log(ret)
  return ret
}
