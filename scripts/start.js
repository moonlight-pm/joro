// Start the dev environment

const { exec } = require('shelljs')
const chokidar = require('chokidar')

module.exports = () => {
  // exec('webpack --config server/webpack.config.js')
  // console.log('Staring client...')
  // exec('webpack-dev-server --config client/webpack.config.js', {
  //   async: true
  // })
  // console.log()
  client()
  server()
}

function client () {
  const proc = exec('webpack-dev-server --config client/webpack.config.js', { async: true })
  proc.stdout.on('data', data => {

  })
}

function server () {
  let proc
  function start () {
    exec('webpack --config server/webpack.config.js')
    proc = exec('electron dist/pack/main.js', { async: true })
  }
  const watcher = chokidar.watch('server')
  watcher.on('change', () => {
    console.log('--- REBUILDING SERVER ---')
    proc.kill()
    start()
  })
  start()
}
