import React from 'react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { styled } from 'baseui'
import { Spinner } from 'baseui/spinner'

const Search = styled('div', {
  height: '36px',
  display: 'flex',
  flexDirection: 'row'
})

const SearchInput = styled('input', {
  padding: '0px 25px',
  flexGrow: 1
})

const SpinnerContainer = styled('div', {
  padding: '4px',
  background: 'white'
})

export default connect({
  searchWaiting: state`searchWaiting`,
  searchValue: state`searchValue`,
  setSearchValue: sequences`setSearchValue`
}, function ({ searchWaiting, setSearchValue }) {
  return (
    <Search>
      <SearchInput onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault()
          setSearchValue({ searchValue: e.target.value })
        }
      }} />
      {searchWaiting &&
        <SpinnerContainer>
          <Spinner size={28} />
        </SpinnerContainer>
      }
    </Search>
  )
})
