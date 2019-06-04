import React from 'react'
import styled from 'styled-components'

import { connect } from '@joro/state'

import Keyboard from './Keyboard'
import Search from './Search'
import Location from './Location'
import Browser from './Browser'
import SearchResults from './SearchResults'

const Main = styled.main`
  app-region: drag;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #323234;
  display: flex;
  flex-direction: column;
`

export default connect('search',
  function ({ search }) {
    return (
      <Main>
        {search.active ? <Search /> : <Location />}
        <Browser />
        <SearchResults />
        <Keyboard handleKeys={['esc', 'meta']} handleFocusableElements onKeyEvent={(key, event) => {
          console.log(key, event.key)
          if (key === 'esc') {
            search.exit()
          }
          if (key === 'meta') {
            if (event.key === 'l') {
              search.activate()
            }
          }
        }} />
      </Main>
    )
  })
