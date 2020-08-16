const { resolve } = require('path')

const PRODUCTION = process.env.NODE_ENV === 'production'

const dist = resolve('dist', 'pack')

module.exports = {
  target: 'electron-main',
  entry: resolve(__dirname, 'index.js'),
  mode: PRODUCTION ? 'production' : 'development',
  output: {
    filename: 'main.js',
    path: dist
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/env', {
              targets: {
                electron: '5'
              }
            }]
          ]
        }
      }
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }]
  }
}
