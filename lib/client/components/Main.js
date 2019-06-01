import React from 'react'
import { styled } from 'styletron-react'

import Search from './Search'
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

export default function () {
  return (
    <Main>
      <Search />
      <Browser />
      <SearchResults />
    </Main>
  )
}
