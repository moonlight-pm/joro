import React from 'react'
import styled from 'styled-components'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

const Tabs = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`

const Tab = styled.div`
  background: ${props => props.selected ? '#358480' : '#434346'};
  color: white;
  padding: 10px 10px;
  border-bottom: 1px solid #212121;
`

export default connect({
  tabs: state`tabs`,
  selectedTab: state`selectedTab`,
  selectTab: sequences`selectTab`
}, function ({ tabs, selectedTab, selectTab }) {
  return (
    <Tabs>
      {tabs.map(tab => (
        <Tab
          key={tab.url}
          selected={selectedTab === tab.url}
          onClick={() => selectTab({ tab })}
        >
          {tab.title}
        </Tab>
      ))}
    </Tabs>
  )
})
