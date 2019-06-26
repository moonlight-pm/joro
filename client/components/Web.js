import React, { useRef, useEffect } from 'react'

import About from './About'
import { connect } from '../state'

export default connect('tabs',
  function ({ tabs, id, historyIndex, show }) {
    const web = useRef()
    const tab = tabs.items[id]
    const url = tab.history[historyIndex]
    useEffect(() => {
      if (web.current) {
        web.current.addEventListener('page-title-updated', ({ title }) => {
          tabs.update({ id, label: title })
        })
        web.current.addEventListener('page-favicon-updated', ({ favicons }) => {
          tabs.update({ id, icon: favicons[0] })
        })
        web.current.addEventListener('will-navigate', ({ url }) => {
          web.current.stop()
          tabs.update({ id, url })
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
    return (
      url.startsWith('about:')
        ? <About page={url.replace(/^about:/, '')} show={show} />
        : <webview ref={web} src={url} style={{
          background: 'white',
          display: show ? '' : 'none'
        }} />
    )
  })
