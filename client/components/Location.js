import React, { useState } from 'react'
import styled from 'styled-components'
import { HuePicker } from 'react-color'
import tinycolor from 'tinycolor2'

import { connect } from '../state'

import Icon from './Icon'

const Location = styled.div`
  height: 37px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #00000066;
  position: relative;
  user-select: none;
  > [name=prism] > div {
    display: none;
  }
  :hover {
    > [name=prism] > div {
      display: block;
    }
  }
`

const LocationUrl = styled.div.attrs(({ color }) => ({
  style: {
    color
  }
}))`
  padding: 1px 25px;
  flex-grow: 1;
  line-height: 36px;
  /* text-shadow: 0px 0px 3px black; */
`

const ColorPicker = styled.div.attrs(({ background, show }) => ({
  style: {
    display: show ? 'block' : 'none',
    background
  }
}))`
  position: absolute;
  top: 0px;
  right: 36px;
  padding: 10px;
  padding-left: 16px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-app-region: none;
  .hue-horizontal {
    border: 1px solid black;
    border-radius: 4px;
    > div {
      top: -1px;
    }
  }

`

export default connect('sessions', 'tabs', 'colors',
  function ({ sessions, tabs, colors, set }) {
    const [ showColors, setShowColors ] = useState(false)
    return (
      <Location>
        <LocationUrl color={colors.foreground}>
          {tabs.current && tabs.items[tabs.current].url}
        </LocationUrl>
        <Icon
          name='prism'
          color={colors.foreground}
          size={28}
          margin={4}
          forceShowInner={showColors}
          onClick={event => {
            event.stopPropagation()
            setShowColors(!showColors)
          }}
        />
        <div style={{ width: '4px' }} />
        <ColorPicker show={showColors} background={colors.background}>
          <HuePicker
            color={colors.background}
            onChange={color => {
              colors.set({
                'background': color.hex,
                'foreground': tinycolor(color.hex.color).getLuminance() < 0.65 ? 'white' : 'black'
              })
            }}
          />
        </ColorPicker>
      </Location>
    )
  })
