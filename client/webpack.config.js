const { resolve } = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const VisualizerPlugin = require('webpack-visualizer-plugin')
const { DefinePlugin } = require('webpack')
const LodashPlugin = require('lodash-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production'

const dist = resolve('dist', 'pack')

module.exports = {
  target: 'electron-renderer',
  entry: resolve(__dirname, 'index.js'),
  mode: PRODUCTION ? 'production' : 'development',
  output: {
    filename: 'renderer.js',
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
            }],
            ['@babel/react', {}]
          ],
          plugins: [
            'lodash'
          ]
        }
      }
    }, {
      test: /\.(png|ttf|svg)$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new HtmlPlugin({
      template: resolve(__dirname, 'index.html')
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    }),
    new VisualizerPlugin({
      filename: '../renderer.html'
    }),
    new LodashPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    hot: true,
    port: 9999
  }
}
