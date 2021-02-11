const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon: './src/favicon.ico',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
      },
    }),
  ],
});
