const { resolve } = require('path')
const Visualizer = require('webpack-visualizer-plugin')

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
    }]
  },
  plugins: [
    new Visualizer({
      filename: '../main.html'
    })
  ]
}
