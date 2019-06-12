import { Menu, app } from 'electron'

import menu from './menu'
import './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('PRODUCTION', PRODUCTION)
console.log('DIR', app.getAppPath())

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

app.on('ready', () => {
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
})
