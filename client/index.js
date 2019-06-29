import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import fontFiraSansCondensedRegular from './assets/fonts/FiraSansCondensed/FiraSansCondensed-Regular.ttf'
import fontFiraSansCondensedBold from './assets/fonts/FiraSansCondensed/FiraSansCondensed-Bold.ttf'

import actions from './actions'
import ipc from './ipc'

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

// store.on('mutation', (changes) => {
//   ipc.state.save({ data: omit(store.getState(), ['search', 'vault']) })
// })

ipc.on('session:settings', () => {
  actions.tabs.create({ url: 'about:settings', label: 'Joro - Session Settings' })
})

// ipc.on('tabs:create', () => {
//   store.getSequence('tabs:create')({ url: 'about:blank', label: '' })
//   store.getSequence('search:activate')()
// })

// ipc.on('tabs:delete', () => {
//   store.getSequence('tabs:delete')()
// })

// ipc.on('tabs:devtools', () => {
//   Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0].openDevTools()
// })
