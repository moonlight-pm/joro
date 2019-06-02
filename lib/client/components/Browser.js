import React from 'react'
import { styled } from 'styletron-react'

import Splitter from 'react-split'

import Tabs from './Tabs'
import Content from './Content'

const Browser = styled(Splitter, {
  flexGrow: 1,
  display: 'flex'
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
    >
      <Tabs />
      <Content />
    </Browser>
  )
}
