import React from 'react'
import { styled } from 'styletron-react'

import Splitter from 'react-split'

import Tabs from './Tabs'
import Content from './Content'

const Browser = styled(Splitter, {
  flexGrow: 1,
  display: 'flex',
  '-webkit-app-region': 'none'
})

export default function () {
  return (
    <Browser
      gutterSize={5}
      sizes={[25, 75]}
      elementStyle={(dimension, size, gutterSize) => {
        return {
          'flex-basis': `calc(${size}% - ${gutterSize}px)`
        }
      }}
      onDragEnd={sizes => {
        console.log(sizes)
      }}
      gutter={(index, direction) => {
        const gutter = document.createElement('div')
        gutter.style.borderLeft = '1px solid #505050'
        gutter.style.background = '#353535'
        gutter.style.borderRight = '1px solid #717171'
        gutter.style.cursor = 'col-resize'
        return gutter
      }}
    >
      <Tabs />
      <Content />
    </Browser>
  )
}
