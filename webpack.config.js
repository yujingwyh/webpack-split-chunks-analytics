const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const entry = require('./source/entry.json');

const webpackConfig = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/dist/",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: false
  }
};
module.exports = webpackConfig;
