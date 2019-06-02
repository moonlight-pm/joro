import React from 'react'
import { styled } from 'baseui'

import { connect } from '@joro/state'

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

export default connect('search',
  function ({ search }) {
    return (
      <>
        {search.active && <SearchResults items={search.items}>
          {search.items.map((item, index) => (
            <SearchResult key={item.url} selected={index === search.index}>
              <SearchResultTitle>{item.title}</SearchResultTitle>
              <SearchResultBlurb>{item.blurb}</SearchResultBlurb>
            </SearchResult>
          ))}
        </SearchResults>
        }
      </>
    )
  })
