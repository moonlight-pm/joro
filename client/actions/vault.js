import ipc from '../ipc'
import state from '../state'

async function login ({ username, password }) {
  if (await ipc.vault.login({ username, password })) {
    sync()
  }
}

async function sync ({ store, ipc }) {
  state.vault.items = await ipc.vault.sync()
}

export default {
  login,
  sync
}
