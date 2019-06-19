import { ipcMain, BrowserWindow } from 'electron'

export default {
  register (channel, fn) {
    ipcMain.on(channel, async (event, [{ id }, options]) => {
      options = options || {}
      options.session = BrowserWindow.fromWebContents(event.sender).uuid
      const response = await fn(options)
      if (id) {
        event.reply(channel, { id, response })
      } else {
        event.returnValue = response
      }
    })
  }
}
