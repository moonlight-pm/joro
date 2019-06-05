import { state } from 'cerebral'
// import uuid from 'uuid'
import color from 'tinycolor2'

export default {
  color ({ store, props }) {
    store.set(state`sessions.default.background`, props.color)
    store.set(state`sessions.default.foreground`, color(props.color).getLuminance() < 0.65 ? 'white' : 'black')
  }
}
