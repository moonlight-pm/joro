import styled from 'styled-components'
import stylus from 'stylus'

export default function (tag, code) {
  let css = stylus('SELF\n' + code).render()
  css = css.replace('SELF {\n', '')
  css = css.replace('}', '')
  css = css.replace(/^SELF /m, '')
  css = css.replace(/^SELF/m, '&')
  console.log(css)
  // css.substring(4, css.length - 2)
  // css = css.split('\n').map(l => l.substr(2)).join('\n')
  // console.log(css)
  return styled[tag]`${css}`
}
