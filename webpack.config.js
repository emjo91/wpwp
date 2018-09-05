const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge (
    {
      mode,
      module: {
        rules: [
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
        })
      ] //end plugins
    },
    modeConfig(mode)
  );
};