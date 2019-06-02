const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
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

ipcMain.on('state:load', (event) => {
  event.returnValue = JSON.parse(readFileSync(resolve(app.getPath('userData'), 'state.json'), 'utf8'))
})

const flushState = debounce((state) => {
  writeFileSync(resolve(app.getPath('userData'), 'state.json'), JSON.stringify(state, null, 2))
}, 1000)

ipcMain.on('state:save', (event, state) => {
  flushState(state)
})
