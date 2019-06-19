// Start the dev environment

const { exec } = require('shelljs')
const chokidar = require('chokidar')

module.exports = () => {
  exec('webpack-dev-server --config client/webpack.config.js', { async: true })
  let server
  function start () {
    exec('webpack --config server/webpack.config.js')
    server = exec('electron dist/pack/main.js', { async: true })
  }
  const watcher = chokidar.watch('server')
  watcher.on('change', () => {
    console.log('--- REBUILDING SERVER ---')
    server.kill()
    start()
  })
  start()
}
