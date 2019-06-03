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

const Prism = styled('div', {
  width: '36px',
  margin: '4px',
  background: '#43d2aa',
  maskImage: 'url(assets/icons/prism.svg)',
  maskSize: '28px 28px',
  maskRepeat: 'no-repeat'
})

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Location>
        <LocationUrl>
          {tabs.current && tabs.items[tabs.current].url}
        </LocationUrl>
        <Prism src='assets/icons/prism.svg' />
      </Location>
    )
  })
