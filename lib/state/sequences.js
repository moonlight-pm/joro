import { debounce } from 'cerebral/factories'
import { isPlainObject } from 'lodash'

import actions from './actions'

const sequences = {
  tabs: {
    create: [
      actions.createTab
    ],
    select: [
      actions.selectTab
    ],
    resize: [
      actions.resizeTabs
    ],
    update: [
      actions.updateTab
    ],
    delete: [
      actions.deleteTab
    ]
  },

  search: {
    activate: [
      actions.activateSearch
    ],
    next: [
      actions.selectNextSearchResult
    ],
    previous: [
      actions.selectPreviousSearchResult
    ],
    submit: [
      debounce(100),
      {
        continue: actions.submitSearch,
        discard: []
      }
    ],
    exit: [
      actions.exitSearch
    ]
  }
}

for (const key of Object.keys(sequences)) {
  if (isPlainObject(sequences[key])) {
    for (const name of Object.keys(sequences[key])) {
      sequences[`${key}:${name}`] = sequences[key][name]
    }
    delete sequences[key]
  }
}

export default sequences
