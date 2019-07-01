import { app, Menu, BrowserWindow } from 'electron'

import { createSession, destroySession } from './commands'

import state from './state'
import ipc from './ipc'

const menu = Menu.buildFromTemplate([
  {
    label: app.getName(),
    submenu: [
      { role: 'about', label: 'About Joro' },
      { label: 'Check for Updates...' },
      { type: 'separator' },
      {
        id: 'devtools',
        label: 'Open Developer Tools',
        enabled: false,
        click () {
          const window = BrowserWindow.getFocusedWindow()
          if (window) {
            window.webContents.openDevTools()
            state.sessions[window.uuid].devTools = true
          }
        }
      },
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
      { role: 'selectall' },
      {
        label: 'Find in Page',
        accelerator: 'Command+F',
        click () {
          ipc('page:find')
        }
      },
      {
        label: 'Find Next in Page',
        accelerator: 'Command+G',
        click () {
          ipc('page:findNext')
        }
      }

    ]
  },
  {
    label: 'Session',
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
        label: 'Settings',
        click () {
          ipc('session:settings')
        }
      },
      { type: 'separator' },
      {
        id: 'destroy',
        label: 'Destroy Session',
        enabled: false,
        click () {
          destroySession()
        }
      },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  },
  {
    label: 'Tab',
    submenu: [
      {
        label: 'New Tab',
        accelerator: 'CommandOrControl+T',
        click () {
          ipc('tabs:create')
        }
      },
      {
        label: 'Location Search',
        accelerator: 'CommandOrControl+L',
        click () {
          ipc('search:activate')
        }
      },
      { type: 'separator' },
      {
        label: 'Open Developer Tools',
        click () {
          ipc('tabs:devtools')
        }
      },
      { type: 'separator' },
      {
        id: 'destroy',
        label: 'Close Tab',
        accelerator: 'CommandOrControl+W',
        click () {
          ipc('tabs:close')
        }
      }
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

export default menu
