import React from 'react'
import styled from 'styled-components'

import { connect } from '../state'

import Icon from './Icon'

const Tab = styled.div.attrs(({ background, foreground, selected }) => ({
  style: {
    color: foreground
  }
}))`
  padding: 0px 10px 0px 14px;
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

const Selected = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  height: 28px;
  width: 5px;
  background: ${props => props.color};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`

export default connect('sessions', 'tabs', 'colors',
  function ({ sessions, tabs, colors, id }) {
    const tab = tabs.items[id]
    return (
      <Tab
        background={colors.background}
        foreground={colors.foreground}
        selected={id === tabs.current}
        onClick={() => tabs.select({ id })}
      >
        <div style={{
          marginRight: '6px',
          opacity: '0.7',
          paddingTop: '5px',
          width: '34px'
        }}>
          <img src={tab.icon} style={{
            height: '28px',
            borderRadius: '5px'
          }} />
        </div>
        <Label>{tab.label}</Label>
        <Delete onClick={event => {
          event.stopPropagation()
          tabs.delete({ id })
        }} />
        {tabs.current === id &&
          <Selected color={colors.foreground} />
        }
      </Tab>
    )
  })
