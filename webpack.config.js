var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/static/js');
var APP_DIR = path.resolve(__dirname, 'src');
 
module.exports = {
  entry: APP_DIR + '/index.js',
  target: 'node',
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};