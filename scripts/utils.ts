import * as path from 'path'
import * as fs from "fs";
import webpack from "webpack";
import SplitChunksOptions = webpack.Options.SplitChunksOptions;


//文件描述
export interface FileDescribe {
  name: string,
  size: number,
  asyncDepends: string[],
  syncDepends: string[]
}

//模块描述
export interface ModuleDescribe {
  name: string,
  size?: number,
  syncImport?: ModuleDescribe[]
  asyncImport?: ModuleDescribe[]
}

//选项描述
export interface OptionsDescribe {
  modulesScheme: ModuleDescribe[],
  splitChunks?: SplitChunksOptions
}

//配置
export const config = {
  //打包入口路径
  entry: path.resolve(__dirname, '../entry'),
  //打包输出路径
  output: path.resolve(__dirname, '../output'),
}

//写文件
export async function writeFile(writePath: string, data: any) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path.resolve(config.entry, writePath), data, function (err,) {
      if (err) reject(err);

      resolve();
    })
  })
}
