import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useSharedState } from '../state'
import actions from '../actions'

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

export default function () {
  const { tabs, colors, vault } = useSharedState('tabs.current.pages/current', 'colors', 'vault')
  const usernameInput = useRef()
  useEffect(() => {
    if (vault.login) {
      usernameInput.current.focus()
    }
  }, [vault.login])
  const tab = tabs.current
  const page = tab && tab.pages.current
  return (
    <Location>
      <div style={{ width: '4px' }} />
      <div style={{ padding: '10px', display: 'flex' }}>
        <Icon
          name='arrow'
          color={colors.foreground}
          size={16}
          margin={0}
          onClick={actions.tabs.backward}
        />
        <div style={{ width: '8px' }} />
        <Icon
          name='arrow'
          color={colors.foreground}
          size={16}
          margin={0}
          flip='horizontal'
          onClick={actions.tabs.forward}
        />
      </div>
      <LocationUrl color={colors.foreground}>
        {page && page.url}
      </LocationUrl>
      <Icon
        name='chain'
        color={vault.items ? colors.foreground : '#666666'}
        size={20}
        margin={8}
        onClick={event => {
          event.stopPropagation()
          vault.login = !vault.login
        }}
      />
      <div style={{ width: '4px' }} />
      <VaultLogin show={vault.login} onSubmit={event => {
        event.preventDefault()
        vault.show = false
        const username = event.target.username.value.trim()
        const password = event.target.password.value.trim()
        if (username && password) {
          actions.vault.login({ username, password })
        }
        event.target.username.value = ''
        event.target.password.value = ''
      }}>
        <input name='username' type='email' ref={usernameInput} />
        <input name='password' type='password' />
        <button type='submit' style={{ display: 'none' }} />
      </VaultLogin>
      <VaultMenu show={page && page.logins} color={colors.foreground}>
        {/* <span>Logout</span> */}
        {page && page.logins && page.logins.map(login => (
          <span key={login.username} onClick={() => {
            actions.tabs.login(login)
          }}>{login.username}</span>
        ))}
      </VaultMenu>
    </Location>
  )
}
