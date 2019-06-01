import cerebral from 'cerebral'
import devtools from 'cerebral/devtools'
import sequences from './sequences'

// const state = JSON.parse(window.localStorage.getItem('state') || JSON.stringify({
//   view: {}
// }))

const state = {
  tabs: [{
    url: 'tab1',
    title: 'Tab 1'
  }, {
    url: 'tab2',
    title: 'Tab 2'
  }, {
    url: 'tab3',
    title: 'Tab 3'
  }],
  selectedTab: 'tab2',
  tabsWidth: 200,
  searchWaiting: false,
  searchActive: false,
  searchValue: '',
  searchResults: []
}

const app = cerebral({
  state,
  providers: {
  },
  sequences
}, {
  devtools: devtools({
    host: 'localhost:9998'
  })
})

export default app

app.on('mutation', (changes) => {
  // window.localStorage.setItem('state', JSON.stringify(app.getState()))
})

// if (state.session && state.session.token) {
//   // app.getSequence('initialize')()
// }
