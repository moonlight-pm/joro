import React from 'react'
import { styled } from 'baseui'

import { connect } from '@joro/state'

const Content = styled('div', {
  '-webkit-app-region': 'none'
})

const Webview = styled('webview', {
  height: '100%'
})

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Content>
        {tabs.items.map((tab, i) => (
          <Webview key={tab.id} src={tab.url} style={{ display: i === tabs.index ? '' : 'none' }} />
        ))}
      </Content>
    )
  })
