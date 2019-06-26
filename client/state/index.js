import cerebral, { state, sequences } from 'cerebral'
import { Container, connect as cerebralConnect } from '@cerebral/react'
import { initial, last, omit, merge } from 'lodash'

import actions from './actions'
import defaults from './defaults'
import ipc from '../ipc'

const PRODUCTION = process.env.NODE_ENV === 'production'

function connect (...args) {
  const namespaces = initial(args)
  const component = last(args)
  const dep = {}
  for (const namespace of namespaces) {
    dep[namespace] = state`${namespace}`
    for (const key of Object.keys(actions)) {
      if (key.startsWith(`${namespace}:`)) {
        dep[key] = sequences`${key}`
      }
    }
  }
  return cerebralConnect(
    dep,
    (props, ownProps) => {
      for (const key of Object.keys(props)) {
        if (key.includes(':')) {
          const [namespace, action] = key.split(':')
          if (!props[namespace]) props[namespace] = {}
          props[namespace][action] = props[key]
          delete props[key]
        }
      }
      return Object.assign(props, ownProps)
    },
    component
  )
}
console.log(ipc.sync.state.load())
merge(defaults, ipc.sync.state.load())
merge(defaults.vault, { items: ipc.sync.vault.sync() })

const store = cerebral({
  state: defaults,
  sequences: actions,
  providers: {
    ipc: () => ipc
  }
}, {
  devtools: !PRODUCTION && require('cerebral/devtools').default({
    host: 'localhost:3001'
  })
})

store.on('mutation', (changes) => {
  ipc.state.save({ data: omit(store.getState(), ['search', 'vault']) })
})

ipc.on('session:settings', () => {
  store.getSequence('tabs:create')({ url: 'about:settings', label: 'Joro - Session Settings' })
})

ipc.on('tabs:create', () => {
  store.getSequence('tabs:create')({ url: 'about:blank', label: '' })
  store.getSequence('search:activate')()
})

ipc.on('tabs:delete', () => {
  store.getSequence('tabs:delete')()
})

ipc.on('tabs:devtools', () => {
  Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0].openDevTools()
})

export { Container, connect, store }
