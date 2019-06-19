import colors from './colors'
import tabs from './tabs'
import search from './search'
import vault from './vault'

const actions = {
  colors,
  tabs,
  search,
  vault
}

const sequences = {}

for (const namespace of Object.keys(actions)) {
  for (const name of Object.keys(actions[namespace])) {
    sequences[`${namespace}:${name}`] = actions[namespace][name]
  }
}

export default sequences
