const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/scripts')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
