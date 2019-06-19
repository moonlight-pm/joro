import { BrowserWindow, Menu, app, ipcMain } from 'electron'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { rm } from 'shelljs'

import menu from './menu'
import { createSession } from './commands'
import state from './state'
import Passwords from './passwords'

// const PRODUCTION = process.env.NODE_ENV === 'production'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

for (const partition of readdirSync(resolve(app.getPath('userData'), 'Partitions'))) {
  if (!state.sessions[partition]) {
    console.log('DELETING', resolve(app.getPath('userData'), 'Partitions', partition))
    rm('-rf', resolve(app.getPath('userData'), 'Partitions', partition))
  }
}

const passwords = new Passwords()
passwords.init()

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

ipcMain.on('state:save', (event, sessionState) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  state.sessions[window.uuid].state = sessionState
})

ipcMain.on('state:load', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  event.returnValue = state.sessions[window.uuid].state
})
