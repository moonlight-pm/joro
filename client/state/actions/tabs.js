import { state } from 'cerebral'
import uuid from 'uuid'

export default {
  create ({ store, get, props }) {
    const tab = {
      id: uuid(),
      url: props.url,
      label: props.label,
      history: [props.url],
      current: 0
    }
    store.set(state`tabs.items.${tab.id}`, tab)
    store.push(state`tabs.order`, tab.id)
    store.set(state`tabs.current`, tab.id)
  },

  forward ({ store, get }) {
    const tabs = get(state`tabs`)
    const tab = tabs.items[tabs.current]
    if (tab.current === tab.history.length - 1) return
    tab.current += 1
    tab.url = tab.history[tab.current]
    store.set(state`tabs.items.${tab.id}`, tab)
  },

  backward ({ store, get }) {
    const tabs = get(state`tabs`)
    const tab = tabs.items[tabs.current]
    if (tab.current === 0) return
    tab.current -= 1
    tab.url = tab.history[tab.current]
    store.set(state`tabs.items.${tab.id}`, tab)
  },

  select ({ store, props }) {
    store.set(state`tabs.current`, props.id)
  },

  resize ({ store, props }) {
    store.set(state`tabs.size`, props.size)
  },

  update ({ store, get, props }) {
    const tab = Object.assign(get(state`tabs.items.${props.id}`), props)
    if (props.url) {
      tab.history = tab.history.slice(0, tab.current + 1)
      tab.history.push(props.url)
      tab.current = tab.history.length - 1
    }
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
