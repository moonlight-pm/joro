import React from 'react'
import styled, { keyframes } from 'styled-components'
import pick from 'lodash/pick'

import iconDelete from '../assets/icons/delete.svg'
import iconPrism from '../assets/icons/prism.svg'
import iconTao from '../assets/icons/tao.svg'

const icons = {
  delete: iconDelete,
  prism: iconPrism,
  tao: iconTao
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const Inner = styled.div`
  width: ${props => `${props.size || 36}`}px;
  height: ${props => `${props.size || 36}`}px;
  background: ${props => `${props.color || 'black'}`};
  mask-image: ${props => `url(${icons[props.name]})`};
  /* mask-image: ${props => `url(assets/icons/${props.name}.svg)`}; */
  mask-size: ${props => `${props.size || 36}`}px ${props => `${props.size || 36}`}px;
  mask-repeat: no-repeat;
  animation: 1.5s ${spin} ease infinite;
  animation-play-state: ${props => props.spin ? '' : 'paused'};
  display: ${props => props.forceShowInner ? 'block !important' : ''};
`

const Outer = styled.div`
  width: ${props => `${(props.size || 36) + (props.margin || 0) * 2}`}px;
  height: ${props => `${(props.size || 36) + (props.margin || 0) * 2}`}px;
  background: ${props => `${props.background || 'inherit'}`};
  padding: ${props => `${props.margin || 0}`}px;
  -webkit-app-region: none;
`

export default ({ ...props }) => (
  <Outer {...props}>
    <Inner {...pick(props, ['size', 'color', 'name', 'margin', 'spin', 'forceShowInner'])} />
  </Outer>
)
