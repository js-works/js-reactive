export default function defineFunctionalComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  const
    ret = function () {
      return config.render.apply(null, arguments)
    }


  Object.defineProperty(ret, 'displayName', {
    value: config.displayName
  })

  return ret
}
