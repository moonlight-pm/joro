import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'
import uuid from 'uuid'

import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

app.windows = {}

export function createSession (id = uuid()) {
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
  app.windows[id] = window
  state.sessions[id] = {}
}

export function destroySession () {
  const window = BrowserWindow.getFocusedWindow()
  window.webContents.session.clearCache(() => {})
  window.webContents.session.clearHostResolverCache()
  window.webContents.session.clearStorageData()
  delete app.windows[window.uuid]
  delete state.sessions[window.uuid]
  window.close()
}
