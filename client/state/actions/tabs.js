import { state } from 'cerebral'
import uuid from 'uuid'

export default {
  create ({ store, get, props }) {
    const tab = { id: uuid(), url: props.url, label: props.label }
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
    const vault = get(state`vault`)
    if (vault.items) {
      tab.logins = Object.values(vault.items)
        .filter(i => tab.url.includes(i.name))
        .map(i => i.id)
    }
    store.set(state`tabs.items.${props.id}`, tab)
  },

  delete ({ store, props, get }) {
    const tabs = get(state`tabs`)
    const id = props.id || tabs.current
    const index = tabs.order.indexOf(id)
    if (tabs.current === id) {
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
    store.unset(state`tabs.items.${id}`)
  },

  login ({ get, store, props }) {
    const { login } = props
    const tabs = get(state`tabs`)
    const i = tabs.order.indexOf(tabs.current)
    const view = document.querySelectorAll('webview')[i]
    view.executeJavaScript(`
      document.querySelector('input[type=email]').value = '${login.username}'
      document.querySelector('input[type=password]').value = '${login.password}'
      document.querySelector('[type=submit]').click()
    `)
    // console.log(view)
    // console.log(login)
  }
}
