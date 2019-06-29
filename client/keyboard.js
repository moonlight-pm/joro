import keyboard from 'hotkeys-js'

import actions from './actions'
import state from './state'

keyboard.filter = () => true

keyboard('⌘+l', () => {
  state.search.active = true
})

keyboard('esc', () => {
  state.search.active = false
})

keyboard('ctrl+n,down', actions.search.next)
keyboard('ctrl+p,up', actions.search.previous)
keyboard('enter', actions.search.select)
