import { app, BrowserWindow, ipcMain } from 'electron'
import { resolve } from 'path'
import { merge } from 'lodash'
import uuid from 'uuid'

import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

app.windows = {}

export function createSession (id = uuid()) {
  console.log('ID', id)
  state.sessions[id] = merge({
    bounds: {
      x: 100,
      y: 100,
      width: 1000,
      height: 1000
    }
  }, (state.sessions[id] || {}))
  const window = new BrowserWindow({
    show: false,
    frame: false,
    x: state.sessions[id].bounds.x,
    y: state.sessions[id].bounds.y,
    width: state.sessions[id].bounds.width,
    height: state.sessions[id].bounds.height,
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
  window.on('moved', (event, bounds) => {
    state.sessions[id].bounds = window.getBounds()
  })
  window.on('resize', (event, bounds) => {
    state.sessions[id].bounds = window.getBounds()
  })
  window.once('ready-to-show', () => {
    window.show()
  })
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
