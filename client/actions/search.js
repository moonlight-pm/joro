import got from 'got'
import parseUrl from 'url-parse-lax'
import debounce from 'lodash/debounce'
import { scrapeHTML } from 'scrape-it'
import cheerio from 'cheerio'

import state from '../state'
import ipc from '../ipc'

import actions from '.'

state.observe('search.active', () => {
  if (state.tabs.current && state.tabs.current.pages.current) {
    state.search.query = state.tabs.current.pages.current.url
  }
})

state.observe('search.index', () => {

})

let request

async function submit ({ query }) {
  state.search.query = query
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
  state.search.loading = true
  const params = new URLSearchParams()
  params.append('term', query)
  const url = `https://www.runnaroo.com/search?${params}`
  if (request && !request.isCanceled) {
    request.cancel()
  }
  request = got(url)
  try {
    const result = await request
    const data = await scrapeHTML(cheerio.load(result.body), {
      items: {
        listItem: '.card-body',
        data: {
          title: 'h5',
          content: {
            texteq: 0
          },
          url: '.text-success'
        }
      }
    })
    console.log('DATA', data)
    state.search.items = data.items
    state.search.index = 0
    state.search.loading = false
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

ipc.on('search:activate', () => {
  if (!state.tabs.current) {
    actions.tabs.create({ url: 'about:blank', title: '' })
  }
  state.search.active = true
})

export default {
  submit: debounce(submit, 200),
  next,
  previous,
  select
}
