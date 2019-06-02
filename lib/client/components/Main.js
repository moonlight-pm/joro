import React from 'react'
import { styled } from 'baseui'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import Search from './Search'
import Location from './Location'
import Browser from './Browser'
import SearchResults from './SearchResults'

const Main = styled('main', {
  '-webkit-app-region': 'drag',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: '#323234',
  display: 'flex',
  flexDirection: 'column'
})

export default connect({
  searchActive: state`searchActive`,
  activateSearch: sequences`activateSearch`,
  exitSearch: sequences`exitSearch`
}, function ({ searchActive, activateSearch, exitSearch, createTab }) {
  return (
    <Main>
      {searchActive ? <Search /> : <Location />}
      <Browser />
      <SearchResults />
      <KeyboardEventHandler handleKeys={['esc', 'ctrl']} handleFocusableElements onKeyEvent={(key, event) => {
        if (key === 'esc') {
          exitSearch()
        }
        if (key === 'ctrl') {
          if (event.key === 's') {
            activateSearch()
          }
        }
      }} />
    </Main>
  )
})
