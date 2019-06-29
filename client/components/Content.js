import React from 'react'
import styled from 'styled-components'

// import { connect } from '../state'
import state from '../state'

import Page from './Page'

const Content = styled.div`
  -webkit-app-region: none;
`

export default function () {
  const { tabs } = state('tabs')
  return (
    <Content>
      {tabs.map(tab => (
        tab.pages.map(page => (
          <Page key={page.id} page={page} show={tab.id === tabs.current.id && page.id === tab.pages.current.id} />
        ))
      ))}
    </Content>
  )
}
