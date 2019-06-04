import React from 'react'
import styled from 'styled-components'

import { connect } from '@joro/state'

import Icon from './Icon'

const Tab = styled.div`
  background: ${props => props.selected ? '#358480' : '#434346'};
  color: white;
  padding: 0px 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #212121;
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

const Delete = ({ onClick }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.5,
    background: 'black',
    height: '39px',
    width: '39px'
  }}>
    <Icon name='delete' color='white' size={20} margin={10} onClick={onClick} />
  </div>
)

export default connect('tabs',
  function ({ tabs, id }) {
    return (
      <Tab
        selected={id === tabs.current}
        onClick={() => tabs.select({ id })}
      >
        <Label>{tabs.items[id].label}</Label>
        <Delete onClick={event => {
          console.log(event)
          event.stopPropagation()
          tabs.delete({ id })
        }} />
      </Tab>
    )
  })
