import React from 'react'
import styled from 'styled-components'
import color from 'tinycolor2'

import { connect } from '@joro/state'

import Icon from './Icon'

const Tab = styled.div.attrs(({ background, foreground, selected }) => ({
  style: {
    background: selected ? color(background)[foreground === 'white' ? 'lighten' : 'darken'](10).toString() : background,
    color: foreground
  }
}))`
  padding: 0px 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #00000066;
  app-region: none;
  position: relative;
  div:nth-child(2) {
    display: none;
  }
  :hover {
    div:nth-child(2) {
      display: block;
    }
  }
`

const Label = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Delete = styled(Icon).attrs(() => ({
  name: 'delete',
  color: 'white',
  background: 'black',
  size: 20,
  margin: 10
}))`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
`

export default connect('sessions', 'tabs',
  function ({ sessions, tabs, id }) {
    return (
      <Tab
        background={sessions.default.background}
        foreground={sessions.default.foreground}
        selected={id === tabs.current}
        onClick={() => tabs.select({ id })}
      >
        <Label>{tabs.items[id].label}</Label>
        <Delete onClick={event => {
          event.stopPropagation()
          tabs.delete({ id })
        }} />
      </Tab>
    )
  })
