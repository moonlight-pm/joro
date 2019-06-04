import { state } from 'cerebral'
// import uuid from 'uuid'

export default {
  color ({ store, props }) {
    store.set(state`sessions.default.color`, props.color)
  }
}
