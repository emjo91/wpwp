const path = require('path');
const webpack = require("webpack");
// include the js minification plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// clear unused js and css
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: ['./assets/src/scripts/app.js', './assets/src/styles/app.scss'],
  output: {
    filename: './assets/dist/scripts/app.min.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      // compile all .scss files to plain old css
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // extract css into dedicated file
    new MiniCssExtractPlugin({
      filename: './assets/dist/styles/main.min.css'
    }), 
    // clean out build directories on each build
    new CleanWebpackPlugin(['./assets/dist/scripts/*','./assets/dist/styles/*'])
  ],
  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      // enable the css minification plugin
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};