import keyboard from 'hotkeys-js'

import actions from './actions'
import state from './state'

keyboard.filter = () => true

keyboard('⌘+l', () => {
  state.search.active = true
})

keyboard('esc', () => {
  state.search.active = false
  if (state.tabs.current && state.tabs.current.pages.current) {
    delete state.tabs.current.pages.current.find
  }
})

keyboard('ctrl+n,down', actions.search.next)
keyboard('ctrl+p,up', actions.search.previous)
keyboard('enter,return', actions.search.select)

keyboard('⌘+f', actions.page.find)
keyboard('⌘+g', actions.page.next)
