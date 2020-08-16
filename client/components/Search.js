import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useSharedState } from '../state'
import actions from '../actions'

import Icon from './Icon'

const Search = styled.div`
  height: 37px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #505050;
  > span {
    flex-grow: 1;
  }
`

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0px 25px;
`

function SearchInput () {
  const { search } = useSharedState('search')
  const input = useRef()
  useEffect(() => {
    input.current.select()
    input.current.focus()
  }, [])
  return (
    <Input
      defaultValue={search.query}
      ref={input}
      onChange={event => {
        actions.search.submit({ query: event.target.value })
      }}
    />
  )
}

const Tao = styled(Icon).attrs(({ show }) => ({
  name: 'tao',
  size: 20,
  margin: 8,
  background: 'white',
  spin: true,
  style: {
    paddingRight: '12px'
  }
}))`
  > div {
    display: ${props => props.show ? '' : 'none'};
  }
`

export default function () {
  const { search, colors } = useSharedState('search', 'colors')
  return (
    <Search>
      <SearchInput />
      <Tao show={search.loading} color={colors.background} />
    </Search>
  )
}
