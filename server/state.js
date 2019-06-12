import { resolve } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'
import { merge } from 'lodash'
import { Observable } from 'object-observer/dist/node/object-observer'

const statePath = resolve(app.getPath('userData'), 'state.json')

const state = Observable.from({
  sessions: {}
})

if (existsSync(statePath)) {
  merge(state, JSON.parse(readFileSync(statePath, 'utf8')))
}

state.observe(() => {
  console.log('STATE', JSON.stringify(state))
  writeFileSync(statePath, JSON.stringify(state, null, 2))
})

export default state
