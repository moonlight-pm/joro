import ipc from '../ipc'

import actions from '.'

ipc.on('session:settings', () => {
  actions.tabs.create({ url: 'about:settings', title: 'Joro - Session Settings' })
})

export default {

}
