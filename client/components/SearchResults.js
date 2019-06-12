import React from 'react'
import styled from 'styled-components'

import { connect } from '../state'

const SearchResults = styled.div`
  position: absolute;
  top: 37px;
  left: 8px;
  right: 8px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: white;
  box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.7);
`

const SearchResult = styled.div`
  padding: 8px 20px;
  background: ${props => props.selected ? '#aff4ff' : 'inherit'};
`

const SearchResultTitle = styled.div`
  color: #397de8;
  font-size: 0.9em;
`

const SearchResultBlurb = styled.div`
  color: grey;
  font-size: 0.7em;
`

export default connect('search',
  function ({ search }) {
    return (
      <>
        {search.active && <SearchResults items={search.items}>
          {search.items.map((item, index) => (
            <SearchResult key={item.url} selected={index === search.index}>
              <SearchResultTitle>{item.title}</SearchResultTitle>
              <SearchResultBlurb>{item.content}</SearchResultBlurb>
              {/* <SearchResultTitle dangerouslySetInnerHTML={{ __html: item.title }} />
              <SearchResultBlurb dangerouslySetInnerHTML={{ __html: item.blurb }} /> */}
            </SearchResult>
          ))}
        </SearchResults>
        }
      </>
    )
  })
