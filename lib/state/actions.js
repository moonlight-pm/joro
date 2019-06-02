/* global fetch AbortController */

import { scrapeHTML as scrape } from 'scrape-it'
import { state } from 'cerebral'
import uuid from 'uuid'

let searchController

export default {
  selectTab ({ store, props }) {
    store.set(state`tabs.index`, props.index)
  },

  activateSearch ({ store, get }) {
    store.set(state`search.active`, true)
  },

  async submitSearch ({ store, props }) {
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
  },

  selectNextSearchResult ({ store, get }) {
    const i = get(state`search.index`)
    if (i < 10) {
      store.set(state`search.index`, i + 1)
    }
  },

  selectPreviousSearchResult ({ store, get }) {
    const i = get(state`search.index`)
    if (i > 0) {
      store.set(state`search.index`, i - 1)
    }
  },

  // confirmSearchResult ({ store, get }) {
  //   const i = get(state`selectedSearchResult`)
  //   const items = get(state`searchResults`)
  //   // store.set(state`page`, items[i])
  // },

  exitSearch ({ store }) {
    store.set(state`search.active`, false)
  },

  // setContentUrl ({ store, props }) {
  //   // store.set(state`page`, { url: props.url })
  // }

  createTab ({ store, get, props }) {
    const tabs = get(state`tabs`)
    const tab = { id: uuid(), url: props.url, label: props.url }
    store.push(state`tabs.items`, tab)
    store.set(state`tabs.index`, tabs.items.length - 1)
  }
}
