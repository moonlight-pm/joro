import React from 'react'
import styled from 'styled-components'

import { connect } from '../state'

import Web from './Web'

const Content = styled.div`
  -webkit-app-region: none;
`

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Content>
        {tabs.order.map(id => (
          <Web key={id} id={id} />
        ))}
      </Content>
    )
  })
