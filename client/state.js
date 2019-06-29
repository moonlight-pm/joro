import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import observable from '../lib/observable'
import ipc from './ipc'

const target = {
  tabs: Object.assign([], {
    current: null,
    size: 25
  }),
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
    login: {
      show: false
    },
    menu: {
      show: false
    }
  }
}

const state = observable(target, {
  apply: (...namespaces) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      function fn () {
        setCount(count + 1)
      }
      state.observe(...namespaces, fn)
      return () => {
        state.unobserve(...namespaces, fn)
      }
    })
    return state
  }
})

state.observe(debounce(() => {
  ipc.state.save({ data: target })
}, 1000))

window.state = state

export default state
