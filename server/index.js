import { Menu, app } from 'electron'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { rm, mkdir } from 'shelljs'

import menu from './menu'
import { createSession } from './commands'
import state from './state'

import './vault'

// const PRODUCTION = process.env.NODE_ENV === 'production'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

const partitionsPath = resolve(app.getPath('userData'), 'Partitions')
mkdir('-p', partitionsPath)

for (const partition of readdirSync(partitionsPath)) {
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
