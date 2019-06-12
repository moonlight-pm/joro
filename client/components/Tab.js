import React from 'react'
import styled from 'styled-components'
import color from 'tinycolor2'

import { connect } from '../state'

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
  display: flex;
  div:nth-child(3) {
    display: none;
  }
  :hover {
    div:nth-child(3) {
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

export default connect('sessions', 'tabs', 'colors',
  function ({ sessions, tabs, colors, id }) {
    return (
      <Tab
        background={colors.background}
        foreground={colors.foreground}
        selected={id === tabs.current}
        onClick={() => tabs.select({ id })}
      >
        <div style={{
          marginRight: '10px',
          opacity: '0.7',
          paddingTop: '5px',
          width: '34px'
        }}>
          <img src={tabs.items[id].icon} style={{
            height: '28px',
            borderRadius: '5px'
          }} />
        </div>
        <Label>{tabs.items[id].label}</Label>
        <Delete onClick={event => {
          event.stopPropagation()
          tabs.delete({ id })
        }} />
      </Tab>
    )
  })
