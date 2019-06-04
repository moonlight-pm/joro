import { state } from 'cerebral'
import uuid from 'uuid'

export default {
  create ({ store, get, props }) {
    const tab = { id: uuid(), url: props.url, label: props.url }
    store.set(state`tabs.items.${tab.id}`, tab)
    store.push(state`tabs.order`, tab.id)
    store.set(state`tabs.current`, tab.id)
  },

  select ({ store, props }) {
    store.set(state`tabs.current`, props.id)
  },

  resize ({ store, props }) {
    store.set(state`tabs.size`, props.size)
  },

  update ({ store, get, props }) {
    const tab = Object.assign(get(state`tabs.items.${props.id}`), props)
    store.set(state`tabs.items.${props.id}`, tab)
  },

  delete ({ store, props, get }) {
    const tabs = get(state`tabs`)
    const index = tabs.order.indexOf(props.id)
    if (tabs.current === props.id) {
      if (tabs.order.length > 1) {
        if (index === tabs.order.length - 1) {
          store.set(state`tabs.current`, tabs.order[index - 1])
        } else {
          store.set(state`tabs.current`, tabs.order[index + 1])
        }
      } else {
        store.set(state`tabs.current`, null)
      }
    }
    store.splice(state`tabs.order`, index, 1)
    store.unset(state`tabs.items.${props.id}`)
  }
}
