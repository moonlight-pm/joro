import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import actions from '../actions'
import { useSharedState } from '../state'

import About from './About'
import Icon from './Icon'

const Find = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  background: ${props => props.background};
  color: ${props => props.foreground};
  padding: 10px 12px 10px 4px;
  border-bottom-left-radius: 5px;
  box-shadow: 0px 2px 7px 3px rgba(0,0,0,0.4);
  input {
    width: 200px;
    border-radius: 3px;
    padding: 0px 8px;
  }
`

const Status = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${props => props.background};
  color: ${props => props.foreground};
  padding: 5px 20px;
  font-size: 0.8em;
  border-top-right-radius: 5px;
`

export default function ({ tab, page, show }) {
  console.log('RENDER PAGE')
  const web = useRef()
  const find = useRef()
  const { colors, vault } = useSharedState('colors', 'vault', page, page.find)
  useEffect(() => {
    console.log('PAGE EFFECT', page.url)
    if (web.current) {
      web.current.addEventListener('dom-ready', () => {
        web.current.executeJavaScript(`
          if (document.querySelector('input[type=password]')) {
            console.log('joro:login')
          } else {
            console.log('joro:nologin')
          }
          window.addEventListener('scroll', event => {
            console.log('joro:scroll:' + window.scrollY)
          })
          //window.scrollY = ${page.scroll || 0}
        `)
      })
      web.current.addEventListener('page-title-updated', ({ title }) => {
        page.title = title
      })
      web.current.addEventListener('page-favicon-updated', ({ favicons }) => {
        page.icon = favicons[0]
      })
      web.current.addEventListener('will-navigate', ({ url }) => {
        web.current.stop()
        actions.tabs.navigate({ url, title: url })
      })
      web.current.addEventListener('update-target-url', ({ url }) => {
        page.target = url
      })
      const logins = vault.items
        .filter(item => item.login && item.login.uris && item.login.uris.filter(uri => page.url.includes(uri._uri)).length)
        .map(item => ({ username: item.login.username, password: item.login.password }))
      web.current.addEventListener('console-message', ({ message }) => {
        console.log(`[${page.url}] ${message}`)
        if (message === 'joro:login' && logins.length) {
          page.logins = logins
        }
        if (message === 'joro:nologin') {
          delete page.logins
        }
        if (message.startsWith('joro:scroll')) {
          page.scroll = message.split(':')[2]
        }
      })
    }
  }, [page])
  useEffect(() => {
    if (find.current) {
      find.current.focus()
    }
  }, [page.find && page.find.active])
  return (
    page.url.startsWith('about:')
      ? <About section={page.url.replace(/^about:/, '')} show={show} />
      : <>
        <webview ref={web} src={page.url} style={{
          background: 'white',
          display: show ? '' : 'none'
        }} />
        {page.find && page.find.active && show &&
          <Find foreground={colors.foreground} background={colors.background}>
            <Icon
              name='find'
              color={colors.foreground}
              size={20}
              margin={4}
            />
            <div style={{ width: '2px' }} />
            <input ref={find} defaultValue={page.find.text} onChange={(event) => {
              page.find.text = event.target.value
            }} />
          </Find>
        }
        {page.target && <Status foreground={colors.foreground} background={colors.background}>{page.target}</Status>}
      </>
  )
}
