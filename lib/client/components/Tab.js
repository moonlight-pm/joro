import React, { useState } from 'react'
import { styled } from 'baseui'
import DeleteIcon from 'baseui/icon/delete'

import { connect } from '@joro/state'

const Tab = styled('div', props => ({
  background: props.selected ? '#358480' : '#434346',
  color: 'white',
  padding: '0px 10px',
  height: '40px',
  lineHeight: '40px',
  borderBottom: '1px solid #212121',
  '-webkit-app-region': 'none',
  position: 'relative'
}))

const Label = styled('div', {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

const Delete = styled(DeleteIcon, {
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
  background: 'black',
  opacity: 0.5
})

export default connect('tabs',
  function ({ tabs, id }) {
    const [ hover, setHover ] = useState(false)
    return (
      <Tab
        selected={id === tabs.current}
        onClick={() => tabs.select({ id })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Label>{tabs.items[id].label}</Label>
        {hover &&
          <Delete size={39} color='white' onClick={event => {
            event.stopPropagation()
            tabs.delete({ id })
          }} />
        }
      </Tab>
    )
  })
