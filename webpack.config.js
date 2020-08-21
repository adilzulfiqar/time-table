const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  // First, let's define an entry point for webpack to start its crawling.
  entry: './public/index.js',
  // Second, we define where the files webpack produce, are placed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'example/src/index.html'),
    }),
  ],
  // Add an instance of the MiniCssExtractPlugin to the plugins list
  // But remember - only for production!
  plugins: isProduction ? [new MiniCssExtractPlugin()] : [],
};

module.exports = config;
