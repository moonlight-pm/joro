import { isObjectLike, initial, last } from 'lodash'

export default function observable (target, { observers, path = '', apply } = {}) {
  let root = false
  if (!observers) {
    if (apply) {
      target = Object.assign(apply, target)
    }
    observers = {}
    root = true
  }
  const proxy = new Proxy(target, {
    get: (target, prop, receiver) => {
      if (isObjectLike(target[prop])) {
        return observable(target[prop], {
          observers,
          path: path ? path + '.' + prop : prop
        })
      }
      return target[prop]
    },
    set: (target, prop, value, receiver) => {
      target[prop] = value
      const $path = path ? path + '.' + prop : prop
      for (const key of Object.keys(observers)) {
        if (key === '$root' || $path.startsWith(key)) {
          for (const fn of observers[key]) {
            console.log('INVOKE', key)
            setTimeout(() => !fn.$unobserved && fn(), 1)
          }
        }
      }
      return true
    }
  })
  if (root) {
    proxy.observe = (...args) => {
      const namespaces = initial(args)
      const fn = last(args)
      if (namespaces.length === 0) namespaces.push('$root')
      console.log('OBSERVE', namespaces)
      for (const namespace of namespaces) {
        if (!observers[namespace]) {
          observers[namespace] = new Set()
        }
        observers[namespace].add(fn)
      }
    }
    proxy.unobserve = (...args) => {
      const namespaces = initial(args)
      const fn = last(args)
      if (namespaces.length === 0) namespaces.push('$root')
      fn.$unobserved = true
      for (const namespace of namespaces) {
        observers[namespace].delete(fn)
      }
    }
  }
  return proxy
}
