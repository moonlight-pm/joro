import React from 'react'
import styled from 'styled-components'
import Splitter from 'react-split'

// import { connect } from '../state'
import state from '../state'

import Tabs from './Tabs'
import Content from './Content'

const Browser = styled(Splitter)`
  flex-grow: 1;
  display: flex;
  .gutter {
    border-left: 1px solid #00000033;
    background: #00000033;
    border-right: 1px solid #00000066;
    -webkit-app-region: none;
    cursor: col-resize;
  }
`

export default function () {
  const { tabs } = state('tabs.size')
  return (
    <Browser
      gutterSize={5}
      sizes={[tabs.size, 100 - tabs.size]}
      elementStyle={(dimension, size, gutterSize) => {
        return {
          'flex-basis': `calc(${size}% - ${gutterSize}px)`
        }
      }}
      onDragEnd={([size]) => {
        tabs.size = size
        // tabs.resize({ size: sizes[0] })
      }}
    >
      <Tabs />
      <Content />
    </Browser>
  )
}
