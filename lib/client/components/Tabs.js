import React from 'react'
import styled from 'styled-components'

import { connect } from '@joro/state'

import Tab from './Tab'

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  min-width: 0px;
`

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Tabs>
        {tabs.order.map(id => (
          <Tab key={id} id={id} />
        ))}
      </Tabs>
    )
  })
