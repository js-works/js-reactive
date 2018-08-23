let extendClass = null

if (typeof Proxy === 'function') {
  try {
    extendClass =
      new Function('baseClass', 'return class extends baseClass {}')
  } catch (e) {
    // ignore
  }
}

if (!extendClass) {
  extendClass = function (baseClass) {
    const ret = function () {
      baseClass.apply(this, arguments)
    }

    ret.prototype = Object.create(baseClass.prototype)

    return ret
  }
}

export default extendClass
