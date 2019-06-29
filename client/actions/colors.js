import { state } from 'cerebral'

export default {
  set ({ store, props }) {
    for (const key of Object.keys(props)) {
      store.set(state`colors.${key}`, props[key])
    }
  }
}
