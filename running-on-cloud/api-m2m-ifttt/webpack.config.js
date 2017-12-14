'use strict';

var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  entry: './src/index.ts',
  context: path.resolve(__dirname),
  output: {
    filename: 'index.js',
    libraryTarget: 'this'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }, {
        test: /\.hbs$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.hbs' ]
  },
  externals: [nodeExternals()]
};
