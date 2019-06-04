import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Inner = styled.div`
  margin: ${props => `${props.margin || 0}`}px;
  width: ${props => `${props.size || 36}`}px;
  height: ${props => `${props.size || 36}`}px;
  background: ${props => `${props.color || 'black'}`};
  mask-image: ${props => `url(assets/icons/${props.name}.svg)`};
  mask-size: ${props => `${props.size || 36}`}px ${props => `${props.size || 36}`}px;
  mask-repeat: no-repeat;
  ${props => props.spin && `animation: 1.5s ${spin.getName()} ease infinite;`}
`

const Outer = styled.div`
  width: ${props => `${(props.size || 36) + (props.margin || 0) * 2}`}px;
  height: ${props => `${(props.size || 36) + (props.margin || 0) * 2}`}px;
  background: ${props => `${props.background || 'inherit'}`};
`

export default ({ ...props }) => (
  <Outer {...props}>
    <Inner {...props} />
  </Outer>
)
