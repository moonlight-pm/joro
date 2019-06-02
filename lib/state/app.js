import cerebral from 'cerebral'
import devtools from 'cerebral/devtools'
import { ipcRenderer } from 'electron'
import { debounce, omit } from 'lodash'

import defaults from './defaults'
import sequences from './sequences'

// const state = JSON.parse(window.localStorage.getItem('state') || JSON.stringify({
//   view: {}
// }))

const app = cerebral({
  state: defaults,
  providers: {
  },
  sequences
}, {
  devtools: devtools({
    host: 'localhost:9998'
  })
})

const flushState = debounce(() => {
  ipcRenderer.send('state', omit(app.getState(), [
    'search'
  ]))
}, 1000)

app.on('mutation', (changes) => {
  flushState()
  // window.localStorage.setItem('state', JSON.stringify(app.getState()))
})

// if (state.session && state.session.token) {
//   // app.getSequence('initialize')()
// }

export default app
