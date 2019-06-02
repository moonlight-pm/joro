import React from 'react'
import { styled } from 'styletron-react'

import { connect } from '@joro/state'

const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

const Tab = styled('div', props => ({
  background: props.selected ? '#358480' : '#434346',
  color: 'white',
  padding: '10px 10px',
  borderBottom: '1px solid #212121',
  '-webkit-user-select': 'none',
  '-webkit-app-region': 'none'
}))

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Tabs>
        {tabs.order.map(id => (
          <Tab
            key={id}
            selected={id === tabs.current}
            onClick={() => tabs.select({ id })}
          >
            {tabs.items[id].label}
          </Tab>
        ))}
      </Tabs>
    )
  })
