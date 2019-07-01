import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import actions from '../actions'
import state from '../state'

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
  const web = useRef()
  const find = useRef()
  const { colors } = state('colors')
  useEffect(() => {
    if (web.current) {
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
        console.log('TARGET', url)
        page.target = url
      })
      const logins = state.vault.items
        .filter(item => item.login && item.login.uris && item.login.uris.filter(uri => page.url.includes(uri._uri)).length)
        .map(item => ({ username: item.login.username, password: item.login.password }))
      web.current.addEventListener('dom-ready', () => {
        web.current.executeJavaScript(`
          if (document.querySelector('input[type=password]')) {
            console.log('joro:login')
          } else {
            console.log('joro:nologin')
          }
        `)
      })
      web.current.addEventListener('console-message', ({ message }) => {
        console.log(`[${page.url}] ${message}`)
        if (message === 'joro:login' && logins.length) {
          page.logins = logins
        }
        if (message === 'joro:nologin') {
          delete page.logins
        }
      })
      web.current.addEventListener('found-in-page', result => {
        console.log('FIND', result)
      })
    }
    // web.current.addEventListener('did-navigate', async () => {
    //   const session = web.current.getWebContents().session
    //   const cookies = await session.cookies.get({})
    //   for (const cookie of cookies) {
    //     console.log(cookie.domain, cookie.path, cookie.name)
    //   }
    // })
  }, [])
  useEffect(() => {
    if (page.find) {
      find.current.focus()
    }
  }, [page.find])
  return (
    page.url.startsWith('about:')
      ? <About section={page.url.replace(/^about:/, '')} show={show} />
      : <>
        <webview ref={web} src={page.url} style={{
          background: 'white',
          display: show ? '' : 'none'
        }} />
        {page.find &&
          <Find foreground={colors.foreground} background={colors.background}>
            <Icon
              name='find'
              color={colors.foreground}
              size={20}
              margin={4}
            />
            <div style={{ width: '2px' }} />
            <input ref={find} onChange={(event) => {
              page.find.text = event.target.value
            }} />
          </Find>
        }
        {page.target && <Status foreground={colors.foreground} background={colors.background}>{page.target}</Status>}
      </>
  )
}
