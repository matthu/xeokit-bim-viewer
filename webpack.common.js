
const path = require('path');
// const CircularDependencyPlugin = require('circular-dependency-plugin');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Used for faster type checking when ts-loader is 'transpileOnly'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    symlinks: false,
    alias: {
        '/node_modules/@xeokit': "@xeokit"
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true,
          transpileOnly: true, // Increases speed by disabling type checking and outputting declaration files
          experimentalWatchApi: true,
        }
        // exclude: /node_modules/,

        // include: [
        //   path.resolve(__dirname, 'src'),
        //   path.resolve(__dirname, 'node_modules/piadc-web/src'),
        // ],
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|[ot]tf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },

  plugins: [
    // new CircularDependencyPlugin({
    //   // exclude detection of files based on a RegExp
    //   // exclude: /a\.js|node_modules/,
    //   // include specific files based on a RegExp
    //   //include: /dir/,
    //   // add errors to webpack instead of warnings
    //   failOnError: true,
    //   // allow import cycles that include an asyncronous import,
    //   // e.g. via import(/* webpackMode: "weak" */ './file.js')
    //   allowAsyncCycles: false,
    //   // set the current working directory for displaying module paths
    //   cwd: process.cwd(),
    // })
    new ForkTsCheckerWebpackPlugin({ async: true }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [ { from: 'public', to: 'dist' } ]}),
  ]
};