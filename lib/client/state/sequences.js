import { state } from 'cerebral'
import { set } from 'cerebral/factories'
import actions from './actions'

export default {
  selectTab: [
    actions.selectTab
  ],

  setSearchValue: [
    actions.setSearchValue
  ]
}
