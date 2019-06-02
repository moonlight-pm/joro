const { resolve } = require('path')
const { writeFileSync } = require('fs')
const { app, BrowserWindow, ipcMain } = require('electron')

const windows = new Set()

app.on('ready', () => {
  const window = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    // titleBarStyle: 'hiddenInset',
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

ipcMain.on('state', (event, state) => {
  console.log(app.getPath('userData'), state)
  // JSON.stringify(app.getState(), null, 2))
  // writeFileSync(resolve(app.getPath('userData'), 'state.json'), data)
})
