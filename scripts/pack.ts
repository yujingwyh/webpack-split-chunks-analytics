import * as  path from 'path';
import * as webpack from "webpack";
import * as webpackBundleAnalyzer from 'webpack-bundle-analyzer'
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import {config, OptionsDescribe} from "./utils";

//获取配置
function getWebpackConfig(options: OptionsDescribe) {
  const webpackConfig = getDefaultConfig();

  webpackConfig.entry = options.modulesStructure.reduce((prev, curr) => {
    prev[curr.name] = path.resolve(config.entry, './' + curr.name + '.js');

    return prev;
  }, {} as { [index: string]: string });
  (webpackConfig.optimization as webpack.Options.Optimization).splitChunks = options.splitChunks || {};

  return webpackConfig;

  function getDefaultConfig(): webpack.Configuration {
    return {
      mode: 'production',
      output: {
        path: config.output,
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
        new webpackBundleAnalyzer.BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
      ],
      optimization: {
        minimize: false
      },
      stats:{
        chunks:true,
        chunkModules:true,
        modules:false
      }
    }
  }
}

//webpack打包
export function build(options: OptionsDescribe) {
  webpack(getWebpackConfig(options), (err: Error, stats: webpack.Stats) => {
    if (err || stats.hasErrors()) {
      return console.error(err);
    }
    console.log(stats.toString({colors:true}))
  })
}
