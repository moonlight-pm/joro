import React from 'react'
import { styled } from 'baseui'

import { connect } from '@joro/state'

import Tab from './Tab'

const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '-webkit-user-select': 'none',
  minWidth: '0px'
})

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
