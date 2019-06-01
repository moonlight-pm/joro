import React from 'react'
import styled from 'styled-components'

import Search from './Search'
import Browser from './Browser'

const Main = styled.main`
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #323234;
  display: flex;
  flex-direction: column;
`

export default function () {
  return (
    <Main>
      <Search />
      <Browser />
    </Main>
  )
}
