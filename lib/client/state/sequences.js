import { state } from 'cerebral'
import { set, debounce } from 'cerebral/factories'
import actions from './actions'

export default {
  selectTab: [
    actions.selectTab
  ],

  activateSearch: [
    actions.activateSearch
  ],

  search: [
    debounce(100),
    {
      continue: actions.search,
      discard: []
    }
  ],

  selectNextSearchResult: [
    actions.selectNextSearchResult
  ],

  selectPreviousSearchResult: [
    actions.selectPreviousSearchResult
  ],

  // confirmSearchResult: [
  //   actions.exitSearch,
  //   actions.confirmSearchResult
  // ],

  exitSearch: [
    actions.exitSearch
  ],

  // setContentUrl: [
  //   actions.setContentUrl
  // ]

  createTab: [
    actions.createTab
  ]
}
