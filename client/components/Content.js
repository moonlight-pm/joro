import React from 'react'
import styled from 'styled-components'

import { connect } from '../state'

import Page from './Page'

const Content = styled.div`
  -webkit-app-region: none;
`

export default connect('tabs', 'pages',
  function ({ tabs, pages }) {
    return (
      <Content>
        {Object.values(pages).map(page => (
          <Page key={page.id} id={page.id} show={page.id === tabs.items[tabs.current].current} />
        ))}
        {/* {tabs.order.map(id => (
          tabs.items[id].history.map((url, i) => (
            <Page key={id + i} id={id} historyIndex={i} show={tabs.current === id && tabs.items[id].current === i} />
          ))
        ))} */}
      </Content>
    )
  })
