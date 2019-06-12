import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'
import { rm } from 'shelljs'
import uuid from 'uuid'

import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

app.windows = {}

export function createSession (id = uuid()) {
  // const id = uuid()
  console.log('ID', id)
  const window = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      allowRunningInsecureContent: true,
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: PRODUCTION,
      partition: `persist:${id}`
    }
  })
  window.uuid = id
  if (PRODUCTION) {
    window.loadFile(resolve(app.getAppPath(), 'index.html'), {
      extraHeaders: 'pragma: no-cache\n'
    })
  } else {
    window.loadURL(`http://localhost:9999`)
  }
  window.on('closed', (event) => {
    console.log('CLOSE', window.destroyPartition)
    if (window.destroyPartition) {
      rm('-rf', resolve(app.getPath('userData'), 'Partitions', window.uuid))
    }
  })
  app.windows[id] = window
  state.sessions[id] = {}
}

export function destroySession () {
  const window = BrowserWindow.getFocusedWindow()
  window.destroyPartition = true
  window.close()
  delete app.windows[window.uuid]
  console.log(window.uuid)
}
