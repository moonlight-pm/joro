import { createOvermind } from 'overmind'
import { createHook, Provider } from 'overmind-react'

export default createOvermind({
  state: {
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
  },
  actions: {
    increaseCount ({ state }) {
      state.count++
    },
    decreaseCount ({ state }) {
      state.count--
    }
  }
})

const useModel = createHook()

export { Provider, useModel }
