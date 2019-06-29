import React from 'react'
import styled from 'styled-components'

import state from '../state'

import Search from './Search'
import Location from './Location'
import Browser from './Browser'
import SearchResults from './SearchResults'

const Main = styled.main.attrs(({ background }) => ({
  style: {
    background
  }
}))`
  app-region: drag;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  /* filter: saturate(30%); */
`

export default function () {
  console.log('RENDER')
  const { search, colors } = state('search.active', 'colors.background')
  return (
    <Main background={colors.background}>
      {search.active ? <Search /> : <Location />}
      <Browser />
      <SearchResults />
    </Main>
  )
}
