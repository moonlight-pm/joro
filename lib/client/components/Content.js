import React from 'react'
import { styled } from 'baseui'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

const Content = styled('div', {

})

const Webview = styled('webview', {
  height: '100%'
})

export default connect({
  page: state`page`
}, function ({ page }) {
  return (
    <Content>
      {page &&
        <Webview src={page.url} />
      }
    </Content>
  )
})
