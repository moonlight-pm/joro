import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { connect } from '../state'

import Icon from './Icon'

const Location = styled.div`
  height: 37px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #00000066;
  position: relative;
  user-select: none;
`

const LocationUrl = styled.div.attrs(({ color }) => ({
  style: {
    color
  }
}))`
  padding: 1px 14px;
  flex-grow: 1;
  line-height: 36px;
  /* text-shadow: 0px 0px 3px black; */
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

const VaultMenu = styled.form.attrs(({ show, color }) => ({
  style: {
    display: show ? 'block' : 'none',
    color: color
  }
}))`
  position: absolute;
  top: 9px;
  right: 44px;
  -webkit-app-region: none;
  span {
    text-decoration: underline;
    margin-right: 8px;
  }
`

export default connect('sessions', 'tabs', 'colors', 'vault',
  function ({ sessions, tabs, colors, vault }) {
    const usernameInput = useRef()
    const [showVaultLogin, setShowVaultLogin] = useState(false)
    const [showVaultMenu, setShowVaultMenu] = useState(false)
    useEffect(() => {
      if (showVaultLogin) {
        usernameInput.current.focus()
      }
    }, [showVaultLogin])
    const tab = tabs.current && tabs.items[tabs.current]
    return (
      <Location>
        <div style={{ width: '4px' }} />
        <div style={{ padding: '10px', display: 'flex' }}>
          <Icon
            name='arrow'
            color={colors.foreground}
            size={16}
            margin={0}
          />
          <div style={{ width: '8px' }} />
          <Icon
            name='arrow'
            color={colors.foreground}
            size={16}
            margin={0}
            flip='horizontal'
          />
        </div>
        <LocationUrl color={colors.foreground}>
          {tab && tab.url}
        </LocationUrl>
        <Icon
          name='chain'
          color={vault.items ? colors.foreground : '#666666'}
          size={20}
          margin={8}
          onClick={event => {
            event.stopPropagation()
            if (vault.items) {
              setShowVaultMenu(!showVaultMenu)
            } else {
              setShowVaultLogin(!showVaultLogin)
            }
          }}
        />
        <div style={{ width: '4px' }} />
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
        <VaultMenu show={showVaultMenu} color={colors.foreground}>
          {/* <span>Logout</span> */}
          {tab && tab.logins && tab.logins.map(l => (
            <span key={l} onClick={() => {
              tabs.login({ login: vault.items[l].login })
            }}>{vault.items[l].login.username}</span>
          ))}
        </VaultMenu>
      </Location>
    )
  })
