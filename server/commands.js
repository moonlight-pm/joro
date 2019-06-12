import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

import state from './state'

const PRODUCTION = process.env.NODE_ENV === 'production'

app.windows = new Set()

export function createSession () {
  const window = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      allowRunningInsecureContent: true,
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      webSecurity: PRODUCTION
    }
  })
  if (PRODUCTION) {
    window.loadFile(resolve(app.getAppPath(), 'index.html'), {
      extraHeaders: 'pragma: no-cache\n'
    })
  } else {
    window.webContents.openDevTools()
    window.loadURL(`http://localhost:9999`)
  }
  app.windows.add(window)
}
