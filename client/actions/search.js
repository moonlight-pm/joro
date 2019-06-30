/* global fetch AbortController */

import parseUrl from 'url-parse-lax'
import debounce from 'lodash/debounce'

import state from '../state'
import actions from '.'

state.observe('search.active', () => {
  if (state.tabs.current && state.tabs.current.pages.current) {
    state.search.query = state.tabs.current.pages.current.url
  }
})

state.observe('search.index', () => {

})

let searchController

async function submit ({ query }) {
  state.search.query = query
  if (searchController) {
    searchController.abort()
  }
  if (query.length < 2 || query.includes('.')) {
    state.search.loading = false
    state.search.items = []
    return
  }
  if (query.startsWith('about:')) {
    state.search.loading = false
    state.search.items = [
      { url: 'about:session', title: 'Joro - Session Settings', content: '' }
    ]
    return
  }
  searchController = new AbortController()
  state.search.loading = true
  const params = new URLSearchParams()
  params.append('format', 'json')
  params.append('q', query)
  // const url = `https://search.blackravenpost.com/?${params}`
  const url = `https://searx.world/?${params}`
  try {
    const response = await fetch(url, { signal: searchController.signal })
    const results = (await response.json()).results
    state.search.loading = false
    state.search.items = results.slice(0, 12)
    state.search.index = 0
  } catch (e) {
  }
}

function next () {
  if (!state.search.active) return
  if (state.search.index < state.search.items.length - 1) {
    state.search.index += 1
  }
}

function previous () {
  if (!state.search.active) return
  if (state.search.index > 0) {
    state.search.index -= 1
  }
}

function select () {
  if (!state.search.active) return
  if (state.search.query.includes('.')) {
    const url = parseUrl(state.search.query)
    actions.tabs.navigate({ url: url.href, title: url.href })
  } else if (state.search.items.length) {
    const item = state.search.items[state.search.index]
    actions.tabs.navigate({ url: item.url, title: item.title })
  }
  state.search.active = false
}

export default {
  submit: debounce(submit, 200),
  next,
  previous,
  select
}
