#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob').sync
const minimist = require('minimist')
const { camelCase } = require('lodash')
const { cyan } = require('colorette')

function usage (scripts) {
  console.log(`Usage: joro <script>\n`)
  const keyWidth = Object.keys(scripts).reduce((m, k) => Math.max(k.length, m), 0)
  for (const key of Object.keys(scripts)) {
    console.log(`  ${cyan(key.padEnd(keyWidth))} - ${scripts[key].description}`)
  }
  console.log('')
}

run()

async function run () {
  const scripts = {}
  for (const file of glob('scripts/**/*.js')) {
    if (file.includes('preamble')) continue
    const key = /^scripts\/(.*).js/.exec(file)[1].replace(/\//g, ':').replace(/:index$/, '')
    const description = (/^\/\/\s*(.*)/.exec(fs.readFileSync(file, 'utf8')) || [])[1] || 'Undocumented'
    scripts[key] = {
      description,
      file
    }
  }
  const script = process.argv[2]
  if (!Object.keys(scripts).includes(script)) {
    return usage(scripts)
  }
  const argv = minimist(process.argv.slice(3))
  const options = argv._
  for (const key of Object.keys(argv)) {
    if (key === '_') continue
    options[camelCase(key)] = argv[key]
  }
  const pfn = require(path.resolve('scripts/preamble.js'))
  const fn = require(path.resolve(scripts[script].file))
  await pfn(options)
  fn(options)
}
