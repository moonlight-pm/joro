import keyboard from 'hotkeys-js'

import actions from './actions'
import state from './state'

keyboard.filter = () => true

keyboard('esc', () => {
  state.search.active = false
  if (state.tabs.current && state.tabs.current.pages.current) {
    actions.page.cancelFind()
  }
})

keyboard('ctrl+n,down', actions.search.next)
keyboard('ctrl+p,up', actions.search.previous)
keyboard('enter,return', actions.search.select)
