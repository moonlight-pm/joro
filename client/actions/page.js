import state from '../state'

function search (findNext = false) {
  const view = Array.from(document.querySelectorAll('webview')).filter(v => v.style.display === '')[0]
  const page = state.tabs.current.pages.current
  const text = page.find && page.find.text
  if (text) {
    view.findInPage(page.find.text, { findNext })
  } else {
    view.stopFindInPage('clearSelection')
  }
}

state.observe('tabs.current.pages.current.find', () => {
  search()
})

function find () {
  state.tabs.current.pages.current.find = {
    text: ''
  }
}

function next () {
  search(true)
}

export default {
  find,
  next
}
