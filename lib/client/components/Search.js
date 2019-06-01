import React, { useRef, useEffect } from 'react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { styled } from 'baseui'
import { Spinner } from 'baseui/spinner'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import parseUrl from 'url-parse-lax'

const Search = styled(KeyboardEventHandler, {
  height: '36px',
  display: 'flex',
  flexDirection: 'row'
})

const SearchInput = connect({
  searchQuery: state`searchQuery`,
  search: sequences`search`
}, function ({ searchQuery, search }) {
  const input = useRef()
  useEffect(() => {
    input.current.select()
    input.current.focus()
  }, [])
  return (
    <input
      defaultValue={searchQuery}
      ref={input}
      style={{
        padding: '0px 25px',
        flexGrow: 1
      }}
      onChange={event => {
        search({ query: event.target.value })
      }}
    />
  )
})

const SpinnerContainer = styled('div', {
  padding: '4px',
  background: 'white'
})

export default connect({
  searchQuery: state`searchQuery`,
  searchWaiting: state`searchWaiting`,
  searchActive: state`searchActive`,
  searchResults: state`searchResults`,
  search: sequences`search`,
  selectNextSearchResult: sequences`selectNextSearchResult`,
  selectPreviousSearchResult: sequences`selectPreviousSearchResult`,
  confirmSearchResult: sequences`confirmSearchResult`,
  exitSearch: sequences`exitSearch`,
  setContentUrl: sequences`setContentUrl`
}, function ({
  searchQuery,
  searchWaiting,
  searchActive,
  searchResults,
  search,
  selectNextSearchResult,
  selectPreviousSearchResult,
  confirmSearchResult,
  exitSearch,
  setContentUrl
}) {
  return (
    <Search handleKeys={['enter', 'ctrl']} onKeyEvent={(key, event) => {
      console.log('SEARCH KEY', key, event)
      event.preventDefault()
      if (key === 'ctrl') {
        if (event.key === 'n') {
          selectNextSearchResult()
        }
        if (event.key === 'p') {
          selectPreviousSearchResult()
        }
      }
      if (key === 'enter') {
        if (searchActive) {
          if (searchQuery.length > 1) {
            if (searchQuery.includes('.')) {
              const url = parseUrl(searchQuery)
              console.log(url)
              setContentUrl({ url: url.href })
            } else if (searchResults.length) {
              confirmSearchResult()
            }
          }
          exitSearch()
        }
      }
    }}>
      <SearchInput />
      {searchWaiting &&
        <SpinnerContainer>
          <Spinner size={28} />
        </SpinnerContainer>
      }
    </Search>
  )
})
