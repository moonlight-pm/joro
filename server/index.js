import { Menu, app } from 'electron'

import menu from './menu'
import { createSession } from './commands'
import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('PRODUCTION', PRODUCTION)
console.log('DIR', app.getAppPath())

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

app.on('ready', () => {
  Menu.setApplicationMenu(menu)
  app.focus()
  for (const id of Object.keys(state.sessions)) {
    createSession(id)
  }
  if (Object.keys(state.sessions).length === 0) {
    createSession()
  }
})

app.on('window-all-closed', () => {
  console.log('Quitting')
  app.quit()
})

app.on('activate', () => {
})
