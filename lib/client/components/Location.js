import React, { useState } from 'react'
import styled from 'styled-components'
import { HuePicker } from 'react-color'

import { connect } from '@joro/state'

import Icon from './Icon'

const Location = styled.div.attrs(({ color }) => ({
  style: {
    background: `${color}99`
  }
}))`
  height: 37px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #505050;
  position: relative;
  user-select: none;
  filter: saturate(30%);
  > [name=prism] > div {
    display: none;
  }
  :hover {
    > [name=prism] > div {
      display: block;
    }
  }
`

// const Location = styled.div`
//   height: 37px;
//   display: flex;
//   flex-direction: row;
//   border-bottom: 1px solid #505050;
//   position: relative;
//   background: ${props => props.color}99;
//   filter: saturate(30%);
//   > [name=prism] > div {
//     display: none;
//   }
//   :hover {
//     > [name=prism] > div {
//       display: block;
//     }
//   }
// `

const LocationUrl = styled.div`
  padding: 1px 25px;
  flex-grow: 1;
  color: white;
  line-height: 36px;
  text-shadow: 0px 0px 3px black;
`

const ColorPicker = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 0px;
  right: 36px;
  padding: 10px;
  padding-left: 16px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: #323234;
  -webkit-app-region: none;
`

export default connect('sessions', 'tabs',
  function ({ sessions, tabs }) {
    const [ showColors, setShowColors ] = useState(false)
    return (
      <Location color={sessions.default.color}>
        <LocationUrl>
          {tabs.current && tabs.items[tabs.current].url}
        </LocationUrl>
        <Icon
          name='prism'
          color='white'
          size={28}
          margin={4}
          forceShowInner={showColors}
          background={showColors ? '#323234' : 'transparent'}
          onClick={event => {
            event.stopPropagation()
            setShowColors(!showColors)
          }}
        />
        <div style={{ width: '4px', backgroundColor: showColors && '#323234' }} />
        <ColorPicker show={showColors}>
          <HuePicker color={sessions.default.color} onChange={color => sessions.color({ color: color.hex })} />
        </ColorPicker>
      </Location>
    )
  })
