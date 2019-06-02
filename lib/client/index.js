import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'

import { Container, app } from '@joro/state'

import Main from './components/Main'

const styletron = new Styletron()

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <StyletronProvider value={styletron}>
      <Container app={app}>
        <Main />
      </Container>
    </StyletronProvider>,
    document.querySelector('root')
  )
})
