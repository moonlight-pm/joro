import React from 'react'
import styled from 'styled-components'

const Divider = styled.div`
  width: 3px;
  border-left: 1px solid #505050;
  background: #353535;
  border-right: 1px solid #717171;
`

export default function () {
  return (
    <Divider />
  )
}
