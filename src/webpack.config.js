const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Tell webpack to start bundling our app at app/index.js
  entry: {
    'app': './public/index.js'
  },
  // Emit source maps so we can debug our code in the browser
  // devtool: 'source-map',
  mode: 'development',
  // Output our app to the dist/ directory
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'foodybuddy.bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015',
          'react'
        ],
        plugins: []
      }
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: '../[path][name].[ext]',
        emitFile: false
      }
    },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
};
