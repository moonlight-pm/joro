import React from 'react'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { styled } from 'baseui'
import { Spinner } from 'baseui/spinner'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const Location = styled('div', {
  height: '36px',
  display: 'flex',
  flexDirection: 'row'
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
  page: state`page`,
  activateSearch: sequences`activateSearch`
}, function ({ page, activateSearch }) {
  return (
    <Location>
      <LocationUrl onClick={() => {
        activateSearch()
      }}>
        {page.url}
      </LocationUrl>
    </Location>
  )
})
