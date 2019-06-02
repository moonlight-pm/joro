import React from 'react'
import { styled } from 'baseui'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import { connect } from '@joro/state'

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

// export default connect({
//   search: state`search`,
//   activate: sequences`activateSearch`,
//   exit: sequences`exitSearch`
// },
// function ({ search, activateSearch, exitSearch, createTab }) {
export default connect('search',
  function ({ search }) {
    return (
      <Main>
        {search.active ? <Search /> : <Location />}
        <Browser />
        <SearchResults />
        <KeyboardEventHandler handleKeys={['esc', 'ctrl']} handleFocusableElements onKeyEvent={(key, event) => {
          if (key === 'esc') {
            search.exit()
          }
          if (key === 'ctrl') {
            if (event.key === 's') {
              search.activate()
            }
          }
        }} />
      </Main>
    )
  })

// export default connect({
//   search: state`search`,
//   activateSearch: sequences`activateSearch`,
//   exitSearch: sequences`exitSearch`
// },
// function ({ search, activateSearch, exitSearch, createTab }) {
//   console.log('SEARCH', search)
//   return (
//     <Main>
//       {search.active ? <Search /> : <Location />}
//       <Browser />
//       <SearchResults />
//       <KeyboardEventHandler handleKeys={['esc', 'ctrl']} handleFocusableElements onKeyEvent={(key, event) => {
//         if (key === 'esc') {
//           exitSearch()
//         }
//         if (key === 'ctrl') {
//           if (event.key === 's') {
//             activateSearch()
//           }
//         }
//       }} />
//     </Main>
//   )
// })
