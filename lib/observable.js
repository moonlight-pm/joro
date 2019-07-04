import { isObjectLike, initial, last } from 'lodash'
import dot from 'dot-prop'

const proxies = new WeakMap()

function invoke (observers, key, proxy) {
  for (const fn of observers.get(key)) {
    if (key !== '$everything') {
      // console.log('INVOKE', key)
    }
    setTimeout(() => !fn.$unobserved && fn(proxy), 1)
  }
}

function notify (observers, root, proxy, prop) {
  // console.log('SEARCHING AGAINST PROXY', proxy)
  // for (const key of Object.keys(observers)) {
  for (const key of observers.keys()) {
    if (key === '$everything') {
      invoke(observers, key)
      continue
    }
    let match = key
    let matchPath
    let matchProp
    if (typeof key === 'string') {
      [ matchPath, matchProp ] = key.split('/')
      match = dot.get(root, matchPath)
    }
    // const found = typeof key === 'string' ? dot.get(root, key) : key
    // console.log('FOUND', key, found)
    if (match === proxy && (!matchProp || matchProp === prop)) {
      invoke(observers, key, proxy)
    }
  }
}

export default function observable (target, { root, observers = new Map() } = {}) {
  if (proxies.get(target)) return proxies.get(target)
  const proxy = new Proxy(target, {
    get: (target, prop, receiver) => {
      if (prop === '$target') return target
      if (isObjectLike(target[prop])) {
        return observable(target[prop], {
          root,
          observers
        })
      }
      return target[prop]
    },
    set: (target, prop, value, receiver) => {
      const newValue = (isObjectLike(value) && value.$target) || value
      if (target[prop] !== newValue) {
        target[prop] = newValue
        notify(observers, root, proxy, prop)
      }
      return true
    },
    deleteProperty: (target, prop) => {
      delete target[prop]
      notify(observers, root, proxy, prop)
      return true
    }
  })
  if (!root) {
    root = proxy
    target.observe = (...args) => {
      const namespaces = initial(args)
      const fn = last(args)
      if (namespaces.length === 0) namespaces.push('$everything')
      // console.log('OBSERVE', namespaces)
      for (const namespace of namespaces) {
        if (!observers.get(namespace)) {
          observers.set(namespace, new Set())
        }
        observers.get(namespace).add(fn)
      }
    }
    target.unobserve = (...args) => {
      const namespaces = initial(args)
      const fn = last(args)
      if (namespaces.length === 0) namespaces.push('')
      fn.$unobserved = true
      for (const namespace of namespaces) {
        observers.get(namespace).delete(fn)
      }
    }
  }
  proxies.set(target, proxy)
  return proxy
}
