const { resolve } = require('path')
const { app, BrowserWindow } = require('electron')

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
  window.loadFile(resolve(__dirname, '..', 'client', 'index.html'))
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
