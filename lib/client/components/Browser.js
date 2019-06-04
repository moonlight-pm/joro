import React from 'react'
import styled from 'styled-components'
import Splitter from 'react-split'

import { connect } from '@joro/state'

import Tabs from './Tabs'
import Content from './Content'

const Browser = styled(Splitter)`
  flex-grow: 1;
  display: flex;
`

export default connect('tabs',
  function ({ tabs }) {
    return (
      <Browser
        gutterSize={5}
        sizes={[tabs.size, 100 - tabs.size]}
        elementStyle={(dimension, size, gutterSize) => {
          return {
            'flex-basis': `calc(${size}% - ${gutterSize}px)`
          }
        }}
        onDragEnd={sizes => {
          tabs.resize({ size: sizes[0] })
        }}
      >
        <Tabs />
        <Content />
      </Browser>
    )
  })
