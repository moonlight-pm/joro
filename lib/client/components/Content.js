import React from 'react'
import { styled } from 'baseui'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

const Content = styled('div', {
  '-webkit-app-region': 'none'
})

const Webview = styled('webview', {
  height: '100%'
})

export default connect({
  tabs: state`tabs`,
  selectedTab: state`selectedTab`
}, function ({ tabs, selectedTab }) {
  return (
    <Content>
      {tabs.map(tab => (
        <Webview key={tab.id} src={tab.url} style={{ display: tab.id === selectedTab ? '' : 'none' }} />
      ))}
    </Content>
  )
})
