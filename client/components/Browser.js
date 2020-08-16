import React from 'react'
import styled from 'styled-components'
import Splitter from 'react-split'

import { useSharedState } from '../state'

import Tabs from './Tabs'
import Content from './Content'

const Browser = styled(Splitter)`
  flex-grow: 1;
  display: flex;
  .gutter {
    background: #FFFFFF33;
    -webkit-app-region: none;
    cursor: col-resize;
  }
`

export default function () {
  const { tabs } = useSharedState('tabs')
  return (
    <Browser
      gutterSize={1}
      sizes={[tabs.size, 100 - tabs.size]}
      elementStyle={(dimension, size, gutterSize) => {
        return {
          'flex-basis': `calc(${size}% - ${gutterSize}px)`
        }
      }}
      onDragEnd={([size]) => {
        tabs.size = size
      }}
    >
      <Tabs />
      <Content />
    </Browser>
  )
}
