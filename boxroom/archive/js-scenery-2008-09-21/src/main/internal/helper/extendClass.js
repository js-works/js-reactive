const hasReflect =
  typeof Reflect === 'object'
    && Reflect
    && typeof Reflect.construct === 'function'

export default function extendClass(baseClass) {
  const ret = function () {
    if (!(this instanceof ret)) {
      throw new Error("Class constructor cannot be invoked without 'new'")
    }
    
    return hasReflect
      ? Reflect.construct(baseClass, arguments, this.constructor)
      : void(baseClass.apply(this, arguments))
  }

  ret.prototype = Object.create(baseClass.prototype, {
    constructor: {
      value: ret,
    }
  })

  return ret
}
