import React from 'react'
import styled from 'styled-components'

// import { connect } from '../state'
import state from '../state'

import Tab from './Tab'

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  min-width: 0px;
`

export default function () {
  const { tabs } = state('tabs')
  return (
    <Tabs>
      {tabs.map(tab => (
        <Tab key={tab.id} tab={tab} />
      ))}
    </Tabs>
  )
}
