import React from 'react'
import { styled } from 'baseui'

import { connect } from '@joro/state'

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

export default connect('tabs',
  function ({ tabs }) {
    const tab = tabs.items[tabs.index]
    return (
      <Location>
        <LocationUrl>
          {tab && tab.url}
        </LocationUrl>
      </Location>
    )
  })
