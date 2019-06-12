import React, { useRef, useEffect } from 'react'

import { connect } from '../state'

export default connect('tabs',
  function ({ tabs, id }) {
    const web = useRef()
    useEffect(() => {
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
      // web.current.addEventListener('did-navigate', async () => {
      //   const session = web.current.getWebContents().session
      //   const cookies = await session.cookies.get({})
      //   for (const cookie of cookies) {
      //     console.log(cookie.domain, cookie.path, cookie.name)
      //   }
      // })
    }, [])
    return (
      <webview ref={web} src={tabs.items[id].url} style={{
        background: 'white',
        display: tabs.current === id ? '' : 'none'
      }} />
    )
  })
