import React from 'react'
import styled from 'styled-components'

import { useSharedState } from '../state'

import Page from './Page'

const Content = styled.div`
  -webkit-app-region: none;
  position: relative;
`

export default function () {
  const { tabs } = useSharedState('tabs/current', 'tabs.current.pages/current')
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
