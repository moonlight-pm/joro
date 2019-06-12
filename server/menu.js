import { Menu, app } from 'electron'

// import { store } from '../state'
import { createSession } from './commands'

export default Menu.buildFromTemplate([
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
          createSession()
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
