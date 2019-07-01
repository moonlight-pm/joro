import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import flatted from 'flatted'

import observable from '../lib/observable'
import ipc from './ipc'

const target = flatted.parse(ipc.sync.state.load()) || {
  tabs: {
    list: [],
    current: null,
    size: 25
  },
  search: {
    query: null,
    loading: false,
    active: false,
    items: [],
    index: 0
  },
  colors: {
    background: '#323234',
    foreground: 'white'
  },
  vault: {
    items: null,
    login: false
  }
}

const state = observable(target)

export function useSharedState (...namespaces) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    function fn () {
      setCount(count + 1)
    }
    state.observe(...namespaces, fn)
    return () => {
      // console.log('UNOBSERVE', namespaces)
      state.unobserve(...namespaces, fn)
    }
  }, [count])
  return state
}

state.observe(debounce(() => {
  ipc.state.save({ data: flatted.stringify(target, null, 2) })
}, 1000))

window.target = target
window.state = state

export default state
