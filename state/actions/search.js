/* global fetch AbortController */

import { state } from 'cerebral'
import debounce from 'lodash/debounce'

let searchController

export default {
  activate ({ store, get }) {
    const tabs = get(state`tabs`)
    store.set(state`search.active`, true)
    if (tabs.items[tabs.current]) {
      store.set(state`search.query`, tabs.items[tabs.current].url)
    }
  },

  submit: debounce(async function ({ store, props }) {
    store.set(state`search.query`, props.query)
    if (searchController) {
      searchController.abort()
    }
    if (props.query.length < 2 || props.query.includes('.')) {
      store.set(state`search.items`, [])
      store.set(state`search.loading`, false)
      return
    }
    searchController = new AbortController()
    store.set(state`search.loading`, true)
    const params = new URLSearchParams()
    params.append('format', 'json')
    params.append('q', props.query)
    const url = `https://blackravenpost.com/search?${params}`
    try {
      const response = await fetch(url, { signal: searchController.signal })
      const results = (await response.json()).results
      store.set(state`search.loading`, false)
      store.set(state`search.items`, results)
    } catch (e) {
    }
  }, 200),

  next ({ store, get }) {
    const i = get(state`search.index`)
    if (i < 10) {
      store.set(state`search.index`, i + 1)
    }
  },

  previous ({ store, get }) {
    const i = get(state`search.index`)
    if (i > 0) {
      store.set(state`search.index`, i - 1)
    }
  },

  exit ({ store }) {
    store.set(state`search.active`, false)
  }
}
