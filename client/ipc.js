import { ipcRenderer } from 'electron'
import uuid from 'uuid'

const sync = new Proxy({}, {
  get: function (obj, prop) {
    return new Proxy({}, {
      get: function (obj, subprop) {
        return function (options) {
          console.log(`${prop}:${subprop}`)
          return ipcRenderer.sendSync(`${prop}:${subprop}`, [{}, options])
        }
      }
    })
  }
})

function handler (event, { id, response }) {
  promises[id].resolve(response)
  delete promises[id]
}

const handlers = {}
const promises = {}

const rpc = new Proxy({}, {
  get: function (obj, prop) {
    if (prop === 'sync') return sync
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
            ipcRenderer.send(`${prop}:${subprop}`, [{ id }, options])
          })
        }
      }
    })
  }
})

export default rpc
