import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from '@cerebral/react'

import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'

import state from './state'

import Main from './components/Main'

const styletron = new Styletron()

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <StyletronProvider value={styletron}>
      <Container app={state}>
        <Main />
      </Container>
    </StyletronProvider>,
    document.querySelector('root')
  )
})

// const parseUrl = require('url-parse-lax')
// const scrape = require('scrape-it')

// window.addEventListener('load', () => {
//   const search = document.querySelector('.main .right .search')
//   const results = document.querySelector('.results')
//   const webview = document.querySelector('.main .right .content')

//   webview.addEventListener('did-start-loading', () => {
//     console.log('start')
//   })

//   webview.addEventListener('did-stop-loading', () => {
//     console.log('stop')
//     search.select()
//     search.focus()
//   })

//   webview.addEventListener('did-fail-load', event => {
//     console.log(event)
//   })

//   search.addEventListener('mousedown', event => {
//     event.preventDefault()
//     search.select()
//   })

//   search.addEventListener('keydown', async event => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       const url = 'https://www.startpage.com/do/search'
//       const params = new URLSearchParams()
//       params.append('query', search.value)
//       const { items } = (await scrape(`${url}?${params}`, {
//         items: {
//           listItem: 'li.search-result',
//           data: {
//             href: '.search-item__url',
//             title: '.search-item__title > a',
//             blurb: '.search-item__body'
//           }
//         }
//       })).data
//       console.log(items)
//       results.innerHTML = `
//         <ul>
//         ${items.map(item => `<li><div>${item.title}</div><div>${item.blurb}</div></li>`).join('')}
//         </ul>
//       `

//       // form.append('query', search.value)
//       // console.log(form.toString())
//       // webview.loadURL(url, {
//       //   userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
//       //   extraHeaders: '',
//       //   postData: {
//       //     type: 'rawData',
//       //     bytes: Buffer.from(form.toString())
//       //   }
//       // })
//       // webview.focus()
//     }
//   })
// })
