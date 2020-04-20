const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = require('./entry/config.json');

const webpackConfig = {
  mode: 'production',
  entry: config.entry,
  output: {
    path: path.resolve(__dirname, "./output"),
    filename: "[name].js",
    publicPath: "/output/",
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
    minimize: false,
    splitChunks: {
      ...config.splitChunks
    }
  }
};
module.exports = webpackConfig;
