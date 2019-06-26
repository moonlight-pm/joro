import React, { useRef, useEffect } from 'react'

import About from './About'
import { connect } from '../state'

export default connect('tabs', 'pages', 'vault',
  function ({ tabs, pages, vault, id, historyIndex, show }) {
    const web = useRef()
    // const tab = tabs.items[id]
    const page = pages[id]
    console.log(page)
    // const url = tab.history[historyIndex].url
    useEffect(() => {
      if (web.current) {
        web.current.addEventListener('page-title-updated', ({ title }) => {
          // tabs.update({ id, label: title })
        })
        web.current.addEventListener('page-favicon-updated', ({ favicons }) => {
          // tabs.update({ id, icon: favicons[0] })
        })
        web.current.addEventListener('will-navigate', ({ url }) => {
          web.current.stop()
          // tabs.update({ id, url })
        })
        web.current.addEventListener('did-finish-load', async () => {
          //   view.executeJavaScript(`
          //   const password = document.querySelector('input[type=password]')
          //   const username = Array.from(password.form.querySelectorAll('input')).filter(i => ['email', 'text'].includes(i.type))[0]
          //   const submit = Array.from(password.form.querySelectorAll('input')).filter(i => ['submit'].includes(i.type))[0]
          //   username.value = '${login.username}'
          //   password.value = '${login.password}'
          //   username.dispatchEvent(new Event('input'), { bubbles: true })
          //   password.dispatchEvent(new Event('input'), { bubbles: true })
          //   if (submit) {
          //     submit.click()
          //   } else {
          //     password.form.submit()
          //   }
          // `)
          web.current.executeJavaScript(`
            if (document.querySelector('input[type=password]')) console.log('joro:login')
          `)
          // const session = web.current.getWebContents().session
          // const cookies = await session.cookies.get({})
          // for (const cookie of cookies) {
          //   console.log(cookie.domain, cookie.path, cookie.name)
          // }
        })
        web.current.addEventListener('console-message', ({ message }) => {
          // if (tabs.current === id && tab.history === historyIndex) {
          if (message === 'joro:login') {
            // tabs.update({ id, historyIndex, authenticator: true })
            // vault.showMenu()
          }
          // }
        })
      }
    }, [])
    return (
      page.url.startsWith('about:')
        ? <About section={page.url.replace(/^about:/, '')} show={show} />
        : <webview ref={web} src={page.url} style={{
          background: 'white',
          display: show ? '' : 'none'
        }} />
    )
  })
