import React, { useRef, useEffect } from 'react'

import About from './About'

import state from '../state'

export default function ({ page, show }) {
  const web = useRef()
  useEffect(() => {
    // if (web.current) {
    //   web.current.addEventListener('page-title-updated', ({ title }) => {
    //     tabs.update({ id, label: title })
    //   })
    //   web.current.addEventListener('page-favicon-updated', ({ favicons }) => {
    //     tabs.update({ id, icon: favicons[0] })
    //   })
    //   web.current.addEventListener('will-navigate', ({ url }) => {
    //     web.current.stop()
    //     tabs.update({ id, url })
    //   })
    // }

    // web.current.addEventListener('did-navigate', async () => {
    //   const session = web.current.getWebContents().session
    //   const cookies = await session.cookies.get({})
    //   for (const cookie of cookies) {
    //     console.log(cookie.domain, cookie.path, cookie.name)
    //   }
    // })
  }, [])
  return (
    page.url.startsWith('about:')
      ? <About page={page.url.replace(/^about:/, '')} show={show} />
      : <webview ref={web} src={page.url} style={{
        background: 'white',
        display: show ? '' : 'none'
      }} />
  )
}
