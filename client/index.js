import React from 'react'
import ReactDOM from 'react-dom'

import { Container, store } from './state'

import Main from './components/Main'

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <Container app={store}>
      <Main />
    </Container>,
    document.querySelector('root')
  )
})
