const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';

// Naming and path settings
var appName = 'app';
var entryPoint = {
  admin: './src/admin/main.js',
};

var exportPath = path.resolve(__dirname, './assets/js');

// Enviroment flag
var plugins = [];
var env = process.env.NODE_ENV;

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

plugins.push(new VueLoaderPlugin());

// Differ settings based on production flag
if ( devMode ) {
  appName = '[name].js';
} else {
  appName = '[name].min.js';
}

module.exports = {
  entry: entryPoint,
  mode: devMode ? 'development' : 'production',
  output: {
    path: exportPath,
    filename: appName,
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('./src/'),
      'admin': path.resolve('./src/admin/'),
    },
    modules: [
      path.resolve('./node_modules'),
      path.resolve(path.join(__dirname, 'src/')),
    ]
  },
  plugins,

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
}
