import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { initial, last } from 'lodash'

import seq from './sequences'

export default function (...args) {
  const namespaces = initial(args)
  const component = last(args)
  const dep = {}
  for (const namespace of namespaces) {
    dep[namespace] = state`${namespace}`
    for (const key of Object.keys(seq)) {
      if (key.startsWith(`${namespace}:`)) {
        dep[key] = sequences`${key}`
      }
    }
  }
  return connect(
    dep,
    (props) => {
      for (const key of Object.keys(props)) {
        if (key.includes(':')) {
          const [namespace, sequence] = key.split(':')
          if (!props[namespace]) props[namespace] = {}
          props[namespace][sequence] = props[key]
          delete props[key]
        }
      }
      return props
    },
    component
  )
}
