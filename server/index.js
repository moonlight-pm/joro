const { autoUpdater } = require('electron-updater')
const { resolve } = require('path')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { Menu, app, BrowserWindow, ipcMain } = require('electron')
const { debounce } = require('lodash')

const isDevelopment = process.env.NODE_ENV !== 'production'

console.log('ENV', process.env.NODE_ENV)
console.log('DIR', app.getAppPath())

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true
process.env['__REACT_DEVTOOLS_GLOBAL_HOOK__'] = '({ isDisabled: true })'

const windows = new Set()
// const utilityWindows = Set()

const menu = Menu.buildFromTemplate([
  {
    label: app.getName(),
    submenu: [
      { role: 'about', label: 'About Joro' },
      { label: 'Check for Updates...' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'Session',
    submenu: [
      {
        label: 'New',
        accelerator: 'CommandOrControl+N',
        click () {
        }
      },
      { type: 'separator' },
      {
        label: 'Destroy',
        accelerator: 'CommandOrControl+W',
        click () {
        }
      }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }
])

function checkForUpdates () {
  autoUpdater.checkForUpdatesAndNotify()
  setTimeout(checkForUpdates, 1800000)
}

app.on('ready', () => {
  checkForUpdates()
  // autoUpdater.checkForUpdates()
  Menu.setApplicationMenu(menu)
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
  if (isDevelopment) {
    window.webContents.openDevTools()
    window.loadURL(`http://localhost:9999`)
  } else {
    console.log('PATH', resolve(app.getAppPath(), 'index.html'))
    window.loadFile(resolve(app.getAppPath(), 'index.html'), {
      extraHeaders: 'pragma: no-cache\n'
    })
    // console.log(formatUrl({
    //   pathname: join(__dirname, 'index.html'),
    //   protocol: 'file',
    //   slashes: true
    // }))
    // window.loadURL(formatUrl({
    //   pathname: join(__dirname, 'index.html'),
    //   protocol: 'file',
    //   slashes: true
    // }))
  }

  // window.loadFile(resolve(__dirname, '..', 'client', 'index.html'), {
  //   extraHeaders: 'pragma: no-cache\n'
  // })
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

// ipcMain.on('utility:color', (event) => {

// })

// autoUpdater.on('checking-for-update', () => {
//   console.log('UPDATER: checking')
// })
// autoUpdater.on('update-available', (info) => {
//   console.log('UPDATER: available')
// })
// autoUpdater.on('update-not-available', (info) => {
//   console.log('UPDATER: not available')
// })
// autoUpdater.on('error', (err) => {
//   console.log('UPDATER: error', err)
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   console.log('UPDATER: downloading')
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall()
// })
