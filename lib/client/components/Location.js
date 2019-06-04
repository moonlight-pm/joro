import React from 'react'
import styled from 'styled-components'

import { connect } from '@joro/state'

import Icon from './Icon'

const Location = styled.div`
  height: 37px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #505050;
`

const LocationUrl = styled.div`
  padding: 0px 25px;
  flex-grow: 1;
  color: white;
  line-height: 36px;
`

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Location>
        <LocationUrl>
          {tabs.current && tabs.items[tabs.current].url}
        </LocationUrl>
        <Icon name='prism' color='#43d2aa' size={28} margin={4} />
      </Location>
    )
  })
