import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import parseUrl from 'url-parse-lax'

import { connect } from '../state'

import Keyboard from './Keyboard'
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

const SearchInput = connect('search',
  function ({ search }) {
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
          search.submit({ query: event.target.value })
        }}
      />
    )
  })

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

export default connect('sessions', 'search', 'tabs', 'colors',
  function ({ sessions, search, tabs, colors }) {
    return (
      <Search>
        <Keyboard handleKeys={['enter', 'ctrl', 'meta']} onKeyEvent={(key, event) => {
          event.preventDefault()
          if (key === 'ctrl') {
            if (event.key === 'n') {
              search.next()
            }
            if (event.key === 'p') {
              search.previous()
            }
          }
          if (key === 'enter') {
            if (search.query.length > 1) {
              if (search.query.includes('.')) {
                const url = parseUrl(search.query)
                tabs.create({ url: url.href })
              } else if (search.items.length) {
                tabs.create({ url: search.items[search.index].url })
              }
            }
            search.exit()
          }
          if (key === 'meta' && event.key === 'Enter') {
            if (search.query.length > 1) {
              if (search.query.includes('.')) {
                const url = parseUrl(search.query)
                tabs.update({ id: tabs.current, url: url.href })
              } else if (search.items.length) {
                tabs.update({ id: tabs.current, url: search.items[search.index].url })
              }
            }
            search.exit()
          }
        }}>
          <SearchInput />
        </Keyboard>
        <Tao show={search.loading} color={colors.background} />
      </Search>
    )
  })
