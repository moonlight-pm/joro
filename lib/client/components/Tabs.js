import React from 'react'
import { styled } from 'styletron-react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

const Tab = styled('div', props => ({
  background: props.selected ? '#358480' : '#434346',
  color: 'white',
  padding: '10px 10px',
  borderBottom: '1px solid #212121'
}))

export default connect({
  tabs: state`tabs`,
  tabsWidth: state`tabsWidth`,
  selectedTab: state`selectedTab`,
  selectTab: sequences`selectTab`
}, function ({ tabs, tabsWidth, selectedTab, selectTab }) {
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
