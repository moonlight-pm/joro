import scrape from 'scrape-it'
import { state } from 'cerebral'

export default {
  selectTab ({ store, props }) {
    store.set(state`selectedTab`, props.tab.url)
  },

  async setSearchValue ({ store, props }) {
    store.set(state`searchValue`, props.searchValue)
    store.set(state`searchActive`, true)
    store.set(state`searchWaiting`, true)
    const url = 'https://www.startpage.com/do/search'
    const params = new URLSearchParams()
    params.append('query', props.searchValue)
    const { items } = (await scrape(`${url}?${params}`, {
      items: {
        listItem: 'li.search-result',
        data: {
          url: '.search-item__url',
          title: '.search-item__title > a',
          blurb: '.search-item__body'
        }
      }
    })).data
    store.set(state`searchWaiting`, false)
    store.set(state`searchResults`, items)
  }
}
