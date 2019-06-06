const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

const dist = resolve('dist', 'pack')

module.exports = {
  target: 'electron-renderer',
  entry: resolve(__dirname, 'index.js'),
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
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
          ]
        }
      }
    }, {
      test: /\.(png|ttf|svg)$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html')
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    hot: true,
    port: 9999
  }
}
