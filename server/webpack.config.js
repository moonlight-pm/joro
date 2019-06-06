const { resolve } = require('path')

const dist = resolve('dist', 'pack')

module.exports = {
  target: 'electron-main',
  entry: resolve(__dirname, 'index.js'),
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: dist
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
}
