// Publish a production package

const { exec, cp } = require('shelljs')

module.exports = () => {
  process.env.NODE_ENV = 'production'
  exec('webpack --config client/webpack.config.js')
  exec('webpack --config server/webpack.config.js')
  cp('build/package.json', 'dist/pack')
  exec('electron-builder --publish always')
}
