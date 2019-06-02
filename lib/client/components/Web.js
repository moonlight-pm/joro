import React, { useRef, useEffect } from 'react'

import { connect } from '@joro/state'

export default connect('tabs',
  function ({ tabs, id }) {
    const web = useRef()
    useEffect(() => {
      web.current.addEventListener('page-title-updated', ({ title }) => {
        tabs.update({ id, label: title })
      })
      web.current.addEventListener('will-navigate', ({ url }) => {
        web.current.stop()
        tabs.update({ id, url })
      })
    }, [])
    return (
      <webview ref={web} src={tabs.items[id].url} style={{
        background: 'white',
        display: tabs.current === id ? '' : 'none'
      }} />
    )
  })
