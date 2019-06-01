import { state } from 'cerebral'
import { set } from 'cerebral/factories'
import actions from './actions'

export default {
  selectTab: [
    actions.selectTab
  ]
  // authenticate: [
  //   set(state`view.failed`, false),
  //   set(state`view.loading`, true),
  //   actions.authenticate,
  //   {
  //     success: [
  //       actions.mailboxes,
  //       actions.messages
  //     ],
  //     error: [
  //       set(state`view.failed`, true)
  //     ]
  //   },
  //   set(state`view.loading`, false)
  // ],
  // initialize: [
  //   actions.messages
  // ],
  // quit: [
  //   actions.quit
  // ],
  // selectMessage: [
  //   actions.selectMessage
  // ]
}
