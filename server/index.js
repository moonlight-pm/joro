import { Menu, app } from 'electron'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { rm } from 'shelljs'

import menu from './menu'
import { createSession } from './commands'
import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

for (const partition of readdirSync(resolve(app.getPath('userData'), 'Partitions'))) {
  if (!state.sessions[partition]) {
    console.log('DELETING', resolve(app.getPath('userData'), 'Partitions', partition))
    rm('-rf', resolve(app.getPath('userData'), 'Partitions', partition))
  }
}

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
