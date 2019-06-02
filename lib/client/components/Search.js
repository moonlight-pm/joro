import React, { useRef, useEffect } from 'react'
import { styled } from 'baseui'
import { Spinner } from 'baseui/spinner'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import parseUrl from 'url-parse-lax'

import { connect } from '@joro/state'

const Search = styled(KeyboardEventHandler, {
  height: '37px',
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '1px solid #505050'
})

const SearchInput = connect('search',
  function ({ search }) {
    const input = useRef()
    useEffect(() => {
      input.current.select()
      input.current.focus()
    }, [])
    return (
      <input
        defaultValue={search.query}
        ref={input}
        style={{
          padding: '0px 25px',
          flexGrow: 1
        }}
        onChange={event => {
          search.submit({ query: event.target.value })
        }}
      />
    )
  })

const SpinnerContainer = styled('div', {
  padding: '4px',
  background: 'white'
})

export default connect('search', 'tabs',
  function ({ search, tabs }) {
    return (
      <Search handleKeys={['enter', 'ctrl']} onKeyEvent={(key, event) => {
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
          if (search.active) {
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
        }
      }}>
        <SearchInput />
        {search.loading &&
        <SpinnerContainer>
          <Spinner size={28} />
        </SpinnerContainer>
        }
      </Search>
    )
  })
