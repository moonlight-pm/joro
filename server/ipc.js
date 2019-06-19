import { ipcMain, BrowserWindow } from 'electron'

export default {
  register (channel, fn) {
    ipcMain.on(channel, async (event, message) => {
      let [{ id }, options] = JSON.parse(message)
      options = options || {}
      options.session = BrowserWindow.fromWebContents(event.sender).uuid
      const response = await fn(options)
      if (id) {
        event.reply(channel, JSON.stringify({ id, response }))
      } else {
        event.returnValue = JSON.stringify(response)
      }
    })
  }
}
