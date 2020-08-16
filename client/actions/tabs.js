import { v4 as uuid } from 'uuid'
import { first, last } from 'lodash'

import state from '../state'
import ipc from '../ipc'

function createPage (url, title) {
  return {
    id: uuid(),
    url,
    title,
    find: {}
  }
}

function create ({ url, title }) {
  const page = createPage(url, title)
  const tab = {
    id: uuid(),
    pages: {
      list: [page],
      current: page
    }
  }
  tab.pages[page.id] = page
  state.tabs.list.push(tab)
  state.tabs[tab.id] = tab
  state.tabs.current = tab
}

function close (tab) {
  const { tabs } = state
  if (!tabs.current) return
  const index = tabs.list.indexOf(tabs.current)
  if (tab === tabs.current) {
    if (tabs.list.length === 1) {
      tabs.current = null
    } else {
      if (index === tabs.list.length - 1) {
        tabs.current = tabs.list[index - 1]
      } else {
        tabs.current = tabs.list[index + 1]
      }
    }
  }
  if (tabs.list.length) {
    tabs.list.splice(index, 1)
    delete tabs[tab.id]
  }
}

function navigate ({ url, title }) {
  const tabs = state.tabs
  const tab = tabs.current
  const page = createPage(url, title)
  tab.pages.list.splice(tab.pages.list.indexOf(tab.pages.current) + 1, Number.MAX_SAFE_INTEGER)
    .forEach(page => delete tab.pages[page.id])
  if (tab.pages.list.length === 1 && tab.pages.current.url === 'about:blank') {
    delete tab.pages[tab.pages.current.id]
    tab.pages.list = []
  }
  tab.pages.list.push(page)
  tab.pages[page.id] = page
  tab.pages.current = page
}

function forward () {
  const tab = state.tabs.current
  const page = tab.pages.current
  if (page === last(tab.pages.list)) return
  tab.pages.current = tab.pages.list[tab.pages.list.indexOf(page) + 1]
}

function backward () {
  const tab = state.tabs.current
  const page = tab.pages.current
  if (page === first(tab.pages.list)) return
  tab.pages.current = tab.pages.list[tab.pages.list.indexOf(page) - 1]
}

function login ({ username, password }) {
  const view = Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0]
  view.executeJavaScript(`
    const password = document.querySelector('input[type=password]')
    const username = Array.from(password.form.querySelectorAll('input')).filter(i => ['email', 'text'].includes(i.type))[0]
    const submit = Array.from(password.form.querySelectorAll('input')).filter(i => ['submit'].includes(i.type))[0]
    username.value = '${username}'
    password.value = '${password}'
    username.dispatchEvent(new Event('input'), { bubbles: true })
    password.dispatchEvent(new Event('input'), { bubbles: true })
    if (submit) {
      submit.click()
    } else {
      password.form.submit()
    }
  `)
}

ipc.on('tabs:create', () => {
  create({ url: 'about:blank', title: '' })
  state.search.active = true
})

ipc.on('tabs:close', () => {
  close(state.tabs.current)
})

ipc.on('tabs:devtools', () => {
  Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0].openDevTools()
})

export default {
  create,
  close,
  navigate,
  forward,
  backward,
  login
}
