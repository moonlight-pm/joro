import tabs from './tabs'
import search from './search'

const actions = {
  tabs,
  search
}

const sequences = {}

for (const namespace of Object.keys(actions)) {
  for (const name of Object.keys(actions[namespace])) {
    sequences[`${namespace}:${name}`] = actions[namespace][name]
  }
}
console.log(sequences)
export default sequences
