import React from 'react'
import styled from 'styled-components'

import state from '../state'

import Page from './Page'

const Content = styled.div`
  -webkit-app-region: none;
`

export default function () {
  const { tabs } = state('tabs')
  return (
    <Content>
      {tabs.list.map(tab => (
        tab.pages.list.map(page => (
          <Page key={page.id} tab={tab} page={page} show={tab === tabs.current && page === tab.pages.current} />
        ))
      ))}
    </Content>
  )
}
