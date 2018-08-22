export default function extendComponentClass(componentClass) {
  let ret

  //const constr = componentClass.bind.call(componentClass, null)
  
  // constructor for proxy
  const constr =  Function.prototype.bind.call(componentClass, null)

  if (typeof Proxy === 'function') {
    /*
    ret = function (props, ctx) {
      return new constr(props, ctx)
    }

    ret.prototype = Object.create(componentClass.prototype)
    */
    ret = new Proxy(componentClass, {
      apply (target, self, args) {
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

  return ret
}
