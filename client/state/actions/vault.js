import { state } from 'cerebral'

export default {
  async login ({ store, props, ipc }) {
    if (await ipc.vault.login(props)) {
      store.set(state`vault.items`, await ipc.vault.sync())
    }
  },

  async sync ({ store, ipc }) {
    store.set(state`vault.items`, await ipc.vault.sync())
  }
}
