// Start the dev environment

const { exec } = require('shelljs')
const chokidar = require('chokidar')

module.exports = () => {
  const client = exec('webpack-dev-server --config client/webpack.config.js', { async: true })
  let server
  function start () {
    exec('webpack --config server/webpack.config.js')
    server = exec('electron dist/pack/main.js', { async: true })
    server.on('exit', () => {
      client.kill()
      watcher.close()
    })
  }
  const watcher = chokidar.watch('server')
  watcher.on('change', () => {
    console.log('--- REBUILDING SERVER ---')
    server.kill()
    start()
  })
  start()
}
