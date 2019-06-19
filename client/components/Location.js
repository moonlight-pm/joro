import React, { useState, useEffect, useRef } from 'react'
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
  right: 72px;
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

const VaultLogin = styled.form.attrs(({ show }) => ({
  style: {
    display: show ? 'block' : 'none'
  }
}))`
  position: absolute;
  top: 9px;
  right: 44px;
  -webkit-app-region: none;
  input {
    padding: 2px 10px;
    font-size: 0.9em;
    border-radius: 3px;
    width: 226px;
  }
  input:nth-child(1) {
    margin-right: 6px;
  }
`

export default connect('sessions', 'tabs', 'colors', 'vault',
  function ({ sessions, tabs, colors, vault }) {
    const usernameInput = useRef()
    const [showColors, setShowColors] = useState(false)
    const [showVaultLogin, setShowVaultLogin] = useState(false)
    useEffect(() => {
      if (showVaultLogin) {
        usernameInput.current.focus()
      }
    }, [showVaultLogin])
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
        <Icon
          name='chain'
          color={colors.foreground}
          size={20}
          margin={8}
          onClick={event => {
            event.stopPropagation()
            setShowVaultLogin(true)
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
        <VaultLogin show={showVaultLogin} onSubmit={event => {
          event.preventDefault()
          setShowVaultLogin(false)
          console.log(event.target.username.value)
          const username = event.target.username.value.trim()
          const password = event.target.password.value.trim()
          if (username && password) {
            vault.login({ username, password })
          }
          event.target.username.value = ''
          event.target.password.value = ''
        }}>
          <input name='username' type='email' ref={usernameInput} />
          <input name='password' type='password' />
          <button type='submit' style={{ display: 'none' }} />
        </VaultLogin>
      </Location>
    )
  })
