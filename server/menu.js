import { app, Menu, BrowserWindow } from 'electron'

// import { store } from '../state'
import { createSession, destroySession } from './commands'

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
    label: 'Window',
    submenu: [
      {
        label: 'New Session',
        accelerator: 'CommandOrControl+N',
        click () {
          createSession()
        }
      },
      { type: 'separator' },
      {
        id: 'destroy',
        label: 'Destroy Session',
        accelerator: 'CommandOrControl+W',
        enabled: false,
        click () {
          destroySession()
        }
      },
      { type: 'separator' },
      {
        id: 'devtools',
        label: 'Open Developer Tools',
        enabled: false,
        click () {
          const window = BrowserWindow.getFocusedWindow()
          window && window.webContents.openDevTools()
        }
      },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }
])

app.on('browser-window-blur', () => {
  menu.getMenuItemById('destroy').enabled = false
  menu.getMenuItemById('devtools').enabled = false
})

app.on('browser-window-focus', () => {
  menu.getMenuItemById('destroy').enabled = true
  menu.getMenuItemById('devtools').enabled = true
})

// console.log('MENU', )

export default menu
