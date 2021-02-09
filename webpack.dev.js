const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    // launch with "yarn run start" then navigate to the app
    contentBase: './dist',
    host: 'localhost',
    publicPath: '/',
    https: false,
    port:3017,
    // see https://webpack.js.org/configuration/dev-server/#devserver-proxy for details
    // proxy: {
    //   '/public': {
    //       target: 'http://localhost:3333',
    //       pathRewrite: {'^/static' : '/app/static'}
    //     }
    // },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon: './src/favicon.ico',
    }),
  ],
});
