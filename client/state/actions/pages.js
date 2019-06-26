import { state } from 'cerebral'
import uuid from 'uuid'

export default {
  // create ({ store, get, props }) {
  //   const tab = {
  //     id: uuid(),
  //     url: props.url,
  //     label: props.label,
  //     history: [{
  //       url: props.url,
  //       label: props.label
  //     }],
  //     current: 0
  //   }
  //   store.set(state`tabs.items.${tab.id}`, tab)
  //   store.push(state`tabs.order`, tab.id)
  //   store.set(state`tabs.current`, tab.id)
  // },

  // forward ({ store, get }) {
  //   const tabs = get(state`tabs`)
  //   const tab = tabs.items[tabs.current]
  //   if (tab.current === tab.history.length - 1) return
  //   tab.current += 1
  //   Object.assign(tab, tab.history[tab.current])
  //   store.set(state`tabs.items.${tab.id}`, tab)
  // },

  // backward ({ store, get }) {
  //   const tabs = get(state`tabs`)
  //   const tab = tabs.items[tabs.current]
  //   if (tab.current === 0) return
  //   tab.current -= 1
  //   Object.assign(tab, tab.history[tab.current])
  //   store.set(state`tabs.items.${tab.id}`, tab)
  // },

  // select ({ store, props }) {
  //   store.set(state`tabs.current`, props.id)
  // },

  // resize ({ store, props }) {
  //   store.set(state`tabs.size`, props.size)
  // },

  // update ({ store, get, props }) {
  //   const tab = Object.assign(get(state`tabs.items.${props.id}`), props)
  //   console.log(props)
  //   if (props.historyIndex) {
  //     tab.history[props.historyIndex].authenticator = props.authenticator
  //   } else {
  //     if (props.url) {
  //       if (tab.history.length && tab.history[tab.history.length - 1].url === 'about:blank') {
  //         tab.history.pop()
  //         tab.current -= 1
  //       }
  //       tab.history = tab.history.slice(0, tab.current + 1)
  //       tab.history.push({ url: props.url })
  //       tab.current = tab.history.length - 1
  //     }
  //     if (props.label) {
  //       tab.history[tab.current].label = props.label
  //     }
  //     if (props.icon) {
  //       tab.history[tab.current].icon = props.icon
  //     }
  //     const vault = get(state`vault`)
  //     if (vault.items) {
  //       tab.logins = Object.values(vault.items)
  //         .filter(i => tab.url.includes(i.name))
  //         .map(i => i.id)
  //     }
  //   }
  //   store.set(state`tabs.items.${props.id}`, tab)
  // },

  // delete ({ store, props, get }) {
  //   const tabs = get(state`tabs`)
  //   const id = props.id || tabs.current
  //   const index = tabs.order.indexOf(id)
  //   if (tabs.current === id) {
  //     if (tabs.order.length > 1) {
  //       if (index === tabs.order.length - 1) {
  //         store.set(state`tabs.current`, tabs.order[index - 1])
  //       } else {
  //         store.set(state`tabs.current`, tabs.order[index + 1])
  //       }
  //     } else {
  //       store.set(state`tabs.current`, null)
  //     }
  //   }
  //   store.splice(state`tabs.order`, index, 1)
  //   store.unset(state`tabs.items.${id}`)
  // },

  // login ({ get, store, props }) {
  //   const { login } = props
  //   store.set(state`vault.menu.show`, false)
  //   const view = Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0]
  //   view.executeJavaScript(`
  //     const password = document.querySelector('input[type=password]')
  //     const username = Array.from(password.form.querySelectorAll('input')).filter(i => ['email', 'text'].includes(i.type))[0]
  //     const submit = Array.from(password.form.querySelectorAll('input')).filter(i => ['submit'].includes(i.type))[0]
  //     username.value = '${login.username}'
  //     password.value = '${login.password}'
  //     username.dispatchEvent(new Event('input'), { bubbles: true })
  //     password.dispatchEvent(new Event('input'), { bubbles: true })
  //     if (submit) {
  //       submit.click()
  //     } else {
  //       password.form.submit()
  //     }
  //   `)
  // }
}
