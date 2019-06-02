const { resolve } = require('path')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { app, BrowserWindow, ipcMain } = require('electron')
const { debounce } = require('lodash')

const windows = new Set()

app.on('ready', () => {
  const window = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      allowRunningInsecureContent: true,
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true
    }
  })
  window.webContents.openDevTools()

  window.loadFile(resolve(__dirname, '..', 'client', 'index.html'), {
    extraHeaders: 'pragma: no-cache\n'
  })
  windows.add(window)
  window.on('closed', () => {
    windows.delete(window)
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
})

const statePath = resolve(app.getPath('userData'), 'state.json')

ipcMain.on('state:load', (event) => {
  event.returnValue = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {}
})

const flushState = debounce((state) => {
  writeFileSync(statePath, JSON.stringify(state, null, 2))
}, 1000)

ipcMain.on('state:save', (event, state) => {
  flushState(state)
})
