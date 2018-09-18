import extendClass from '../helper/extendClass'

export default function defineClassComponent(config) {
  if (typeof config === 'function') {
    config = config()
  }

  const
    ret = extendClass(config.main),
    displayName = config.displayName

  Object.defineProperties(ret, {
    displayName: {
      value: displayName
    },

    contextTypes: {
      value: null
    },

    childContextTypes: {
      value: null
    }
  })

  return ret
}
