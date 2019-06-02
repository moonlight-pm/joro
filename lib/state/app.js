import cerebral from 'cerebral'
import devtools from 'cerebral/devtools'
import { ipcRenderer } from 'electron'
import { omit, merge } from 'lodash'

import defaults from './defaults'
import sequences from './sequences'

merge(defaults, ipcRenderer.sendSync('state:load'))

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

app.on('mutation', (changes) => {
  ipcRenderer.send('state:save', omit(app.getState(), [
    'search'
  ]))
})

export default app
