import React, { useRef, useEffect } from 'react'

import { connect } from '@joro/state'

export default connect('tabs',
  function ({ tabs, id }) {
    const web = useRef()
    useEffect(() => {
      web.current.addEventListener('page-title-updated', ({ title }) => {
        tabs.label({ id, label: title })
      })
    }, [])
    return (
      <webview ref={web} src={tabs.items[id].url} />
      // <Web src={tab.url} style={{ display: i === tabs.index ? '' : 'none' }} />
    )
  })
