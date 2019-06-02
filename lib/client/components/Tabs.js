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
  borderBottom: '1px solid #212121',
  '-webkit-user-select': 'none',
  '-webkit-app-region': 'none'
}))

export default connect({
  tabs: state`tabs`,
  tabsWidth: state`tabsWidth`,
  selectedTab: state`selectedTab`,
  selectTab: sequences`selectTab`
}, function ({ tabs, tabsWidth, selectedTab, selectTab }) {
  console.log(tabs)
  return (
    <Tabs>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          selected={selectedTab === tab.id}
          onClick={() => selectTab({ tab: tab.id })}
        >
          {tab.label}
        </Tab>
      ))}
    </Tabs>
  )
})
