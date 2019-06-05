import React from 'react'
import ReactDOM from 'react-dom'

import { Container, app } from '../state'

import Main from './components/Main'

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <Container app={app}>
      <Main />
    </Container>,
    document.querySelector('root')
  )
})
