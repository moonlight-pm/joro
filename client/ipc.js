import { ipcRenderer } from 'electron'
import { v4 as uuid } from 'uuid'

const sync = new Proxy({}, {
  get: function (obj, prop) {
    return new Proxy({}, {
      get: function (obj, subprop) {
        return function (options) {
          return JSON.parse(ipcRenderer.sendSync(`${prop}:${subprop}`, JSON.stringify([{}, options])))
        }
      }
    })
  }
})

function handler (event, result) {
  const { id, response } = JSON.parse(result)
  promises[id].resolve(response)
  delete promises[id]
}

const handlers = {}
const promises = {}

const ipc = new Proxy({}, {
  get: function (obj, prop) {
    if (prop === 'sync') return sync
    if (prop === 'on') return (...args) => ipcRenderer.on(...args)
    return new Proxy({}, {
      get: function (obj, subprop) {
        const channel = `${prop}:${subprop}`
        if (!handlers[channel]) {
          handlers[channel] = true
          ipcRenderer.on(channel, handler)
        }
        return async function (options) {
          const id = uuid()
          return new Promise((resolve, reject) => {
            promises[id] = { resolve, reject }
            ipcRenderer.send(`${prop}:${subprop}`, JSON.stringify([{ id }, options]))
          })
        }
      }
    })
  }
})

export default ipc
