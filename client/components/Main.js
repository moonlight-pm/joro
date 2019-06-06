import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { connect } from '../../state'

import Keyboard from './Keyboard'
import Search from './Search'
import Location from './Location'
import Browser from './Browser'
import SearchResults from './SearchResults'

import fontFiraSansCondensedRegular from '../assets/fonts/FiraSansCondensed/FiraSansCondensed-Regular.ttf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Fira Sans Condensed';
    src: url(${fontFiraSansCondensedRegular});
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Fira Sans Condensed';
    box-sizing: border-box;
    outline: none;
    font-size: 1em;
  }

  webview {
    height: 100%;
  }
`

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
  filter: saturate(30%);
`

export default connect('sessions', 'search',
  function ({ sessions, search }) {
    return (
      <Main background={sessions.default.background}>
        <GlobalStyle />
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
