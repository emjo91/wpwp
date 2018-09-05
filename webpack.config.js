const path = require('path');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge (
    {
      mode,
      module: {
        rules: [
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
          {
            test: /\.(sass|scss)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }
        ]
      },
      entry: ['./assets/src/scripts/app.js', './assets/src/styles/app.scss'],
      output: {
        filename: './assets/dist/scripts/app.min.js',
        path: path.resolve(__dirname)
      }, //end output
      plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: './assets/dist/styles/main.min.css'
        }), 
        new CleanWebpackPlugin(['./assets/dist/scripts/*','./assets/dist/styles/*'])
      ], //end plugins
      optimization: {
        minimizer: [
          new UglifyJSPlugin({
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      } //end opt
    },
    modeConfig(mode)
  );
};