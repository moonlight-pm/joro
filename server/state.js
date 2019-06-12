import { resolve } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'
import { merge, debounce } from 'lodash'
import { Observable } from 'object-observer/dist/node/object-observer'

const statePath = resolve(app.getPath('userData'), 'state.json')

const state = Observable.from({
  sessions: []
})

if (existsSync(statePath)) {
  merge(state, JSON.parse(readFileSync('statePath', 'utf8')))
}

// const windows = new Set()

// console.log('WINDOWS', app.windows)
// app.on('browser-window-created', (event, window) => {
//   windows.add(window)
//   window.on('closed', () => {
//     windows.delete(window)
//   })
// })

// const store = cerebral({
//   state: defaults
// }, {
//   devtools: process.env.NODE_ENV !== 'production' && require('cerebral/devtools').default({
//     host: 'localhost:3000'
//   })
// })

// store.on('mutation', (changes) => {
//   ipcRenderer.send('state:save', omit(store.getState(), [
//     'search'
//   ]))
// })

// ipcMain.on('state:load', (event) => {
//   event.returnValue = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {}
// })

state.observe(debounce(() => {
  console.log('STATE', JSON.stringify(state))
  writeFileSync(statePath, JSON.stringify(state, null, 2))
}, 1000))

// ipcMain.on('state:save', (event, state) => {
//   flushState(state)
// })

// ipcMain.on('state:update', (event, state) => {
// saveState(state)
// })

export default state
