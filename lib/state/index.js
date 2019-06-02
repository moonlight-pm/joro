export { Container } from '@cerebral/react'
export { default as app } from './app'
export { default as connect } from './connect'

// import cerebral from 'cerebral'

// import devtools from 'cerebral/devtools'
// import { ipcRenderer } from 'electron'
// import { debounce, omit, isPlainObject } from 'lodash'

// import sequences from './sequences'

// // const state = JSON.parse(window.localStorage.getItem('state') || JSON.stringify({
// //   view: {}
// // }))

// for (const key of Object.keys(sequences)) {
//   if (isPlainObject(sequences[key])) {
//     for (const name of Object.keys(sequences[key])) {
//       sequences[`${key}:${name}`] = sequences[key][name]
//     }
//     delete sequences[key]
//   }
// }

// const state = {
//   tabs: {
//     items: [],
//     index: 0,
//     width: 200
//   },
//   search: {
//     query: null,
//     loading: false,
//     active: false,
//     items: [],
//     index: 0
//   }
// }

// const app = cerebral({
//   state,
//   providers: {
//   },
//   sequences
// }, {
//   devtools: devtools({
//     host: 'localhost:9998'
//   })
// })

// export default app

// const flushState = debounce(() => {
//   ipcRenderer.send('state', omit(app.getState(), [
//     'search'
//   ]))
// }, 1000)

// app.on('mutation', (changes) => {
//   flushState()
//   // window.localStorage.setItem('state', JSON.stringify(app.getState()))
// })

// if (state.session && state.session.token) {
//   // app.getSequence('initialize')()
// }
