import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import fontFiraSansCondensedRegular from './assets/fonts/FiraSansCondensed/FiraSansCondensed-Regular.ttf'
import fontFiraSansCondensedBold from './assets/fonts/FiraSansCondensed/FiraSansCondensed-Bold.ttf'

import './keyboard'

import Main from './components/Main'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Fira Sans Condensed';
    src: url(${fontFiraSansCondensedRegular});
  }

  @font-face {
    font-family: 'Fira Sans Condensed';
    src: url(${fontFiraSansCondensedBold});
    font-weight: bold;
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

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <Main />
    </>,
    document.querySelector('root')
  )
})
