/* global fetch AbortController */

import { scrapeHTML as scrape } from 'scrape-it'
import { state } from 'cerebral'

let searchController

export default {
  selectTab ({ store, props }) {
    store.set(state`selectedTab`, props.tab.url)
  },

  activateSearch ({ store, get }) {
    const page = get(state`page`)
    store.set(state`searchActive`, true)
    store.set(state`searchQuery`, page.url)
  },

  async search ({ store, props }) {
    store.set(state`searchQuery`, props.query)
    if (searchController) {
      searchController.abort()
    }
    if (props.query.length < 2 || props.query.includes('.')) {
      store.set(state`searchResults`, [])
      store.set(state`searchWaiting`, false)
      return
    }
    searchController = new AbortController()
    store.set(state`searchWaiting`, true)
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
      store.set(state`searchWaiting`, false)
      store.set(state`searchResults`, items)
    } catch (e) {
    }
  },

  selectNextSearchResult ({ store, get }) {
    const i = get(state`selectedSearchResult`)
    if (i < 10) {
      store.set(state`selectedSearchResult`, i + 1)
    }
  },

  selectPreviousSearchResult ({ store, get }) {
    const i = get(state`selectedSearchResult`)
    if (i > 0) {
      store.set(state`selectedSearchResult`, i - 1)
    }
  },

  confirmSearchResult ({ store, get }) {
    const i = get(state`selectedSearchResult`)
    const items = get(state`searchResults`)
    store.set(state`page`, items[i])
  },

  exitSearch ({ store }) {
    store.set(state`searchActive`, false)
  },

  setContentUrl ({ store, props }) {
    store.set(state`page`, { url: props.url })
  }
}
