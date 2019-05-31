const inquirer = require('inquirer')

module.exports = {
  async askYesNo (message, def = true) {
    return (await inquirer.prompt([{
      name: 'a',
      type: 'confirm',
      default: def,
      message
    }])).a
  },
  async sleep (ms = 3000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  }
}
