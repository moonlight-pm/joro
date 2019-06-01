import React from 'react'
import styled from 'styled-components'

import Tabs from './Tabs'
import Divider from './Divider'
import Content from './Content'

const Browser = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`

export default function () {
  return (
    <Browser>
      <Tabs />
      <Divider />
      <Content />
    </Browser>
  )
}
