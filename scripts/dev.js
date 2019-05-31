// Run for development

const { exec } = require('shelljs')

module.exports = function () {
  exec('electron lib/server/index.js')
}
