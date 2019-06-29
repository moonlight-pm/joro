import { resolve } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { app } from 'electron'
import { merge } from 'lodash'

import observable from '../lib/observable'
import ipc from './ipc'

const statePath = resolve(app.getPath('userData'), 'state.json')

const target = {
  sessions: {}
}

const state = observable(target)

if (existsSync(statePath)) {
  merge(state, JSON.parse(readFileSync(statePath, 'utf8')))
}

state.observe(() => {
  writeFileSync(statePath, JSON.stringify(target, null, 2))
})

ipc.register('state:save', ({ session, data }) => {
  state.sessions[session].state = data
})

ipc.register('state:load', ({ session }) => {
  return state.sessions[session].state
})

export default state
