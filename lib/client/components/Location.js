import React from 'react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { styled } from 'baseui'
import { Spinner } from 'baseui/spinner'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const Location = styled('div', {
  height: '37px',
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '1px solid #505050'
})

const LocationUrl = styled('div', {
  padding: '0px 25px',
  flexGrow: 1,
  color: 'white',
  lineHeight: '36px'
})

const SpinnerContainer = styled('div', {
  padding: '4px',
  background: 'white'
})

export default connect({
  tabs: state`tabs`,
  selectedTab: state`selectedTab`
}, function ({ tabs, selectedTab }) {
  const tab = tabs.filter(t => t.id === selectedTab)[0]
  return (
    <Location>
      <LocationUrl>
        {tab && tab.url}
      </LocationUrl>
    </Location>
  )
})
