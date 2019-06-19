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

merge(defaults, ipc.sync.state.load())

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
  ipc.state.save({ data: omit(store.getState(), ['search']) })
})

export { Container, connect, store }
