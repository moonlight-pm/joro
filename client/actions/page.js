import state from '../state'
import ipc from '../ipc'

function search (findNext = false) {
  const page = state.tabs.current && state.tabs.current.pages.current
  if (!(page && page.find && page.find.active)) return
  const view = Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0]
  if (page.find.text) {
    view.findInPage(page.find.text, { findNext })
  } else {
    view.stopFindInPage('clearSelection')
  }
}

state.observe('tabs.current.pages.current.find/text', find => {
  if (find.active) search()
})

function find () {
  const page = state.tabs.current && state.tabs.current.pages.current
  if (!page) return
  page.find.active = true
  page.find.text = ''
}

function findNext () {
  const page = state.tabs.current && state.tabs.current.pages.current
  if (!(page && page.find && page.find.active)) return
  search(true)
}

function cancelFind () {
  const page = state.tabs.current && state.tabs.current.pages.current
  if (!(page && page.find && page.find.active)) return
  const view = Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0]
  view.stopFindInPage('clearSelection')
  page.find.active = false
}

ipc.on('page:find', find)
ipc.on('page:findNext', findNext)

export default {
  find,
  findNext,
  cancelFind
}
