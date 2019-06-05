/* global fetch AbortController */

import { scrapeHTML as scrape } from 'scrape-it'
import { state } from 'cerebral'
import { debounce } from 'lodash'

let searchController

export default {
  activate ({ store, get }) {
    store.set(state`search.active`, true)
    store.set(state`search.loading`, true)
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
    params.append('query', props.query)
    const url = `https://www.startpage.com/do/search?${params}`
    try {
      const response = await fetch(url, { signal: searchController.signal })
      const html = await response.text()
      const { items } = scrape(html, {
        items: {
          listItem: 'li.search-result',
          data: {
            url: '.search-item__url',
            title: '.search-item__title > a',
            blurb: '.search-item__body'
          }
        }
      })
      store.set(state`search.loading`, false)
      store.set(state`search.items`, items)
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
