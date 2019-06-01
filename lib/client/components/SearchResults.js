import React from 'react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { styled } from 'baseui'

const SearchResults = styled('div', {
  position: 'absolute',
  top: '37px',
  left: '8px',
  right: '8px',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
  background: 'white',
  boxShadow: '0px 10px 13px 0px rgba(0, 0, 0, 0.7)'
})

const SearchResult = styled('div', props => ({
  padding: '8px 20px',
  background: props.selected ? '#aff4ff' : 'inherit'
}))

const SearchResultTitle = styled('div', {
  color: '#397de8',
  fontSize: '0.9em'
})

const SearchResultBlurb = styled('div', {
  color: 'grey',
  fontSize: '0.7em'
})

export default connect({
  searchWaiting: state`searchWaiting`,
  searchActive: state`searchActive`,
  searchResults: state`searchResults`,
  selectedSearchResult: state`selectedSearchResult`
}, function ({ searchWaiting, searchActive, searchResults, selectedSearchResult }) {
  return (
    <>
      {searchActive && <SearchResults items={searchResults}>
        {searchResults.map((item, i) => (
          <SearchResult key={item.url} selected={selectedSearchResult === i}>
            <SearchResultTitle>{item.title}</SearchResultTitle>
            <SearchResultBlurb>{item.blurb}</SearchResultBlurb>
          </SearchResult>
        ))}
      </SearchResults>
      }
    </>
  )
})
