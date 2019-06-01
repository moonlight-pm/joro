import { state } from 'cerebral'

export default {
  selectTab ({ store, props }) {
    store.set(state`selectedTab`, props.tab.url)
  }
  // async authenticate ({ store, props, api, path }) {
  //   const session = await api.authenticate(props.username, props.password)
  //   store.set(state`session`, session)
  //   if (session) {
  //     return path.success()
  //   }
  //   return path.error()
  // },

  // async quit ({ store }) {
  //   store.unset(state`session`)
  //   store.unset(state`mailboxes`)
  //   store.unset(state`messages`)
  //   store.set(state`view`, {})
  //   window.localStorage.removeItem('state')
  // },

  // async mailboxes ({ store, api, props }) {
  //   const mailboxes = await api.mailboxes()
  //   store.set(state`mailboxes`, mailboxes)
  // },

  // async messages ({ get, store, api, props }) {
  //   const inbox = get(state`mailboxes`).filter(o => o.path === 'INBOX')[0]
  //   const messages = await api.messages(inbox.id)
  //   store.set(state`messages`, messages)
  // },

  // selectMessage ({ store, props }) {
  //   store.set(state`view.selectedMessage`, props.message.id)
  // }
}
